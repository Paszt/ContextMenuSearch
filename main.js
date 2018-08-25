/* globals chrome, defaultMenuStructure */

let localMenuStructure;

const createMenu = (item, parent) => {
    if (item.type != 'separator' && !item.enabled) {
        return;
    }
    if (item.type === 'group' && !item.children) {
        return;
    }
    let menuOptions = {
        'id': item.id,
        'contexts': ['selection']
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
                createMenu(childItem, item);
            });
        }
    }
};

const initializeMenus = (storageItems) => {
    localMenuStructure = storageItems.menuStructure;
    chrome.contextMenus.removeAll();
    localMenuStructure.forEach((item) => {
        createMenu(item, null);
    });
    if (storageItems.includeOptionsItem) {
        chrome.contextMenus.create({
            id: 'optionSeparator',
            type: 'separator',
            'contexts': ['selection']
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
    if (menuItem && menuItem.url) {
        let url = menuItem.url;
        url = url.replace(/%s/, encodeURIComponent(info.selectionText));
        switch (menuItem.tabtype) {
            case '(Standard)':
                chrome.tabs.create({
                    url: url,
                    'index': tab.index + 1
                });
                break;
            case '(Last Tab)':
                chrome.tabs.create({
                    url: url
                });
                break;
            case '(Same Tab)':
                chrome.tabs.update(tab.id, {
                    'url': url
                });
                break;
            case '(Incognito)':
                chrome.windows.create({
                    'url': url,
                    'incognito': true,
                    state: 'maximized'
                });
        }
    } else {
        /* jshint ignore:start */
        if (menuItem && !menuItem.url) {
            console.error('Item with id “' + info.menuItemId + '” doesn’t have a url property.');
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
