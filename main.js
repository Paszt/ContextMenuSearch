/* globals chrome, defaultMenuStructure */

let localMenuStructure;

const createMenuItem = (item, parent) => {
    // don’t create if type is group or item but isn't enable, or if type is group but doesn't have children.
    if ((item.type != 'separator' && !item.enabled) || (item.type === 'group' && !item.children)) {
        return;
    }
    // don’t create if there are children, but none of them are enabled.
    // TODO: enhance check for no enabled children to check all nested levels.
    if (item.children && item.children.filter(item => item.enabled === true).length === 0) {
        return;
    }

    let menuOptions = {
        id: item.id,
        contexts: ['selection']
    };
    if (parent) {
        menuOptions.parentId = parent.id;
    }
    if (item.type === 'separator') {
        menuOptions.type = 'separator';
    } else {
        menuOptions.title = item.name;
    }
    chrome.contextMenus.create(menuOptions);
    if (item.type === 'group') {
        if (item.children) {
            item.children.forEach((childItem) => {
                createMenuItem(childItem, item);
            });
        }
    }
};

const initializeMenus = (storageItems) => {
    localMenuStructure = storageItems.menuStructure;
    chrome.contextMenus.removeAll();
    localMenuStructure.forEach((item) => {
        createMenuItem(item, null);
    });
    if (storageItems.includeOptionsItem) {
        chrome.contextMenus.create({
            id: 'optionSeparator',
            type: 'separator',
            contexts: ['selection']
        });
        chrome.contextMenus.create({
            title: 'Options',
            id: 'optionsMenuItem',
            contexts: ['selection']
        });
    }
};

function findItemById(idToFind, obj) {
    let result = null;
    if (!obj) {
        obj = localMenuStructure;
    }
    if (obj instanceof Array) {
        for (let item of obj) {
            let arrayResult = findItemById(idToFind, item);
            if (arrayResult) {
                result = arrayResult;
                break;
            }
        }
    } else {
        if (obj.id === idToFind) {
            return obj;
        }
        if (obj.children) {
            for (let childItem of obj.children) {
                let childResult = findItemById(idToFind, childItem);
                if (childResult) {
                    result = childResult;
                    break;
                }
            }
        }
    }
    return result;
}

const executeSearch = (info, tab) => {
    if (info.menuItemId === 'optionsMenuItem') {
        chrome.runtime.openOptionsPage();
        return;
    }
    let menuItem = findItemById(info.menuItemId);
    if (menuItem && menuItem.urls) {
        let encodedSelection = encodeURIComponent(info.selectionText);
        if (menuItem.tabtype === '(Incognito)') {
            chrome.windows.create({
                url: menuItem.urls.map(url => url.replace(/%s/, encodedSelection)),
                incognito: true,
                state: 'maximized'
            });
        } else {
            menuItem.urls.forEach((url, index) => {
                url = url.replace(/%s/, encodedSelection);
                switch (menuItem.tabtype) {
                    case '(Standard)':
                        chrome.tabs.create({
                            url: url,
                            'index': tab.index + 1 + index,
                            active: menuItem.active,
                        });
                        break;
                    case '(Last Tab)':
                        chrome.tabs.create({
                            url: url,
                            active: menuItem.active,
                        });
                        break;
                    case '(Same Tab)':
                        if (index === 0) {
                            chrome.tabs.update(tab.id, {
                                'url': url,
                                active: menuItem.active,
                            });
                        } else {
                            chrome.tabs.create({
                                url: url,
                                'index': tab.index + index,
                                active: menuItem.active,
                            });
                        }
                }
            });
        }
    } else {
        /* jshint ignore:start */
        if (menuItem && !menuItem.urls) {
            console.error('Item with id “' + info.menuItemId + '” doesn’t have a urls property.');
        } else if (!menuItem) {
            console.error('Couldn’t find item with id “' + info.menuItemId + '.”');
        }
        /* jshint ignore:end */
    }
};

chrome.storage.sync.get({
    'menuStructure': defaultMenuStructure,
    'includeOptionsItem': true
}, initializeMenus);

chrome.storage.onChanged.addListener(function() {
    chrome.storage.sync.get(initializeMenus);
});

chrome.contextMenus.onClicked.addListener(executeSearch);
