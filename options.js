/*globals confirm, chrome, defaultMenuStructure */

const editSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" data-toggle="tooltip" data-original-title="Edit"><path d="m13.1 12 0.9 0.9-9.1 9.1h-0.9v-0.9l9.1-9.1m3.6-6c-0.3 0-0.5 0.1-0.7 0.3l-1.8 1.8 3.8 3.8 1.8-1.8c0.4-0.4 0.4-1 0-1.4l-2.3-2.3c-0.3-0.3-0.6-0.4-0.8-0.4zm-3.6 3.2-11.1 11.1v3.7h3.8l11.1-11.1-3.8-3.7z"/></svg>',
    deleteSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" data-toggle="tooltip" data-original-title="Delete"><path d="m13.1 13.5-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4 2.1-2.1 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4zm1.4-6.5-1-1h-5l-1 1h-3.5v2h14v-2h-3.5zm-9.5 15c0 1.1 0.9 2 2 2h8c1.1 0 2-0.9 2-2v-12h-12v12zm2-10h8v10h-8v-10z"/></svg>',
    addSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22"><path d="m18 12h-6v6h-2v-6h-6v-2h6v-6h2v6h6v2z"/></svg>',
    saveSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
    loadFileSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-587 389 24 24" height="24" width="24"><path fill="none" d="m-587 389h24v24h-24v-24z"/><path d="m-573 391h-8c-1.1 0-2 0.9-2 2v16c0 1.1 0.9 2 2 2h5v-6h-3l4-4 4 4h-3v6h5c1.1 0 2-0.9 2-2v-12l-6-6zm-1 7v-5.5l5.5 5.5h-5.5z"/></svg>',
    saveFileSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m14 2h-8c-1.1 0-2 0.9-2 2v16c0 1.1 0.9 2 2 2h6l-4-4h3v-6h2v6h3l-4 4h6c1.1 0 2-0.9 2-2v-12l-6-6zm-1 7v-5.5l5.5 5.5h-5.5z"/></svg>',
    help30Svg = '<svg xmlns="http://www.w3.org/2000/svg" height="30" width="30"><path fill="#007bff" d="m15 0c-8.2 0-15 6.8-15 15s6.8 15 15 15 15-6.8 15-15c0-8.3-6.7-15-15-15zm1.8 24.8c-0.5 0.5-1 0.8-1.8 0.8-0.7 0-1.3-0.2-1.7-0.8-0.4-0.4-0.8-1.1-0.8-1.8s0.2-1.3 0.8-1.7c0.4-0.4 1.1-0.8 1.7-0.8s1.3 0.2 1.8 0.8c0.5 0.5 0.8 1.1 0.8 1.7-0.1 0.7-0.3 1.3-0.8 1.8zm4.2-13.3c-0.2 0.4-0.3 0.8-0.5 1.2s-0.5 0.8-0.8 1.1-0.6 0.7-1 1l-0.8 0.8c-0.2 0.2-0.4 0.5-0.5 0.8-0.2 0.2-0.2 0.5-0.3 0.8-0.1 0.1-0.1 0.4-0.1 0.7v0.4h-3.8v-1c0-0.4 0.1-0.9 0.1-1.3 0.1-0.4 0.2-0.7 0.5-1.1s0.5-0.8 0.8-1.1c0.3-0.4 0.8-0.8 1.3-1.2s0.9-0.9 1.2-1.3 0.5-0.8 0.5-1.4-0.2-1.1-0.7-1.5-1.1-0.7-1.8-0.7c-0.4 0-0.8 0.1-1.1 0.2-0.3 0.3-0.6 0.4-0.8 0.7s-0.4 0.5-0.6 0.8-0.3 0.6-0.4 0.9l-3.3-1.3c0.1-0.5 0.3-1.1 0.7-1.6 0.3-0.5 0.8-1.1 1.3-1.4 0.5-0.4 1.1-0.8 1.8-1.1 0.6-0.3 1.4-0.4 2.3-0.4s1.7 0.2 2.6 0.4c0.8 0.3 1.4 0.7 1.9 1.1 0.5 0.5 1 1.1 1.3 1.7s0.4 1.3 0.4 2.2c0 0.6-0.1 1.1-0.2 1.6z"/></svg>';

let itemBeingEdited,
    groupBeingEdited,
    oldIndex,
    counter = 0;

(function injectSvg() {
    $('img.add').replaceWith('<span class="icon">' + addSvg + '</span>');
    $('img.save').replaceWith('<span class="icon">' + saveSvg + '</span>');
    $('img.saveFile').replaceWith('<span class="icon">' + saveFileSvg + '</span>');
    $('img.loadFile').replaceWith('<span class="icon">' + loadFileSvg + '</span>');
    $('img.help30').replaceWith('<span class="icon">' + help30Svg + '</span>');
})();

const removeItem = (deleteButton) => {
    let $li = $(deleteButton).closest('li');
    let msg = 'Are you sure you want to delete this ';
    switch ($li.data('type')) {
        case 'item':
            msg += 'item?';
            break;
        case 'group':
            msg += 'group?\nAll nested items will be deleted as well!';
            break;
        case 'separator':
            msg += 'separator?';
    }
    if (confirm(msg)) {
        $li.remove();
        renumberItems();
    }
};

const getNextItemIndex = ($parent) => {
    if ($parent) {
        return 'G' + $parent.closest('li').data('id') + $parent.find(' li').length;
    } else {
        return '0' + $('#sortable > li').length;
    }
};

const addNewItem = (name, url, tabType, enabled, $parent) => {
    counter += 1;
    $('<li class="border border-bottom-0">')
        .data('type', 'item')
        .data('url', url)
        .data('name', name)
        .data('tabtype', tabType)
        .data('enabled', enabled)
        .data('id', getNextItemIndex($parent))
        .append($('<div class="d-flex px-2">')
            .append($('<div class="mr-auto py-1 d-flex">')
                .append($('<div class="custom-control custom-checkbox">')
                    .append('<input type="checkbox" class="custom-control-input position-static" id="isEnabled' + counter +
                        '" data-toggle="tooltip" data-original-title="Enabled?" ' + (enabled ? 'checked' : '') + '>')
                    .append('<label class="custom-control-label" for="isEnabled' + counter + '">' + name))
                .append('<div class="ml-1 type align-self-center mb-1">' + (tabType === '(Standard)' ? '' : tabType)))
            .append($('<span class="px-1" style="cursor:pointer" data-toggle="modal" data-target="#addEditItemModal">' + editSvg)
                .click(function() {
                    itemBeingEdited = $(this).closest('li');
                    $('#newItemName').val(itemBeingEdited.data('name'));
                    $('#newItemURL').val(itemBeingEdited.data('url'));
                    //TODO: Set the value of the Tab Type Radio
                    $('#performAddButton').hide();
                    $('#performUpdateButton').show();
                }))
            .append($('<span class="px-1" style="cursor:pointer" title="Delete">' + deleteSvg)
                .click(function() {
                    removeItem(this);
                })))
        .appendTo($parent ? $parent : '#sortable');
    $('[data-toggle="tooltip"]').tooltip();
};

// Delegated Change Event Handlers for the Enabled checkboxes
$('#sortable').on('change', 'input:checkbox', function() {
    $(this).closest('li').data('enabled', this.checked);
});

const addNewGroup = (groupName, enabled, $parent) => {
    counter += 1;
    let li = $('<li class="border border-bottom-0 position-relative">')
        .data('type', 'group')
        .data('name', groupName)
        .data('enabled', enabled)
        .data('id', getNextItemIndex($parent))
        .append($('<div class="d-flex px-2">')
            .append($('<div class="custom-control custom-checkbox mr-auto py-1">')
                .append('<input type="checkbox" class="custom-control-input position-static" id="isEnabled' + counter +
                    '" data-toggle="tooltip" data-original-title="Enabled?" ' + (enabled ? 'checked' : '') + '>')
                .append('<label class="custom-control-label" for="isEnabled' + counter + '">' + groupName))
            .append($('<span class="px-1" style="cursor:pointer" data-toggle="modal" data-target="#addEditGroupModal">' + editSvg)
                .click(function() {
                    groupBeingEdited = $(this).closest('li');
                    $('#newGroupName').val(groupBeingEdited.data('name'));
                    $('#addEditGroupModal .performAddButton').hide();
                    $('#addEditGroupModal .performUpdateButton').show();
                }))
            .append($('<span class="px-1" style="cursor:pointer">' + deleteSvg)
                .click(function() {
                    removeItem(this);
                }))
            .append('<span class="marker empty" data-toggle="tooltip" data-original-title="Empty group, will not be created">'))
        .append('<ol>')
        .appendTo($parent ? $parent : '#sortable');
    $('[data-toggle="tooltip"]').tooltip();
    return li.find('ol');
};

const addSeparator = ($parent) => {
    $('<li class="border border-bottom-0">')
        .data('type', 'separator')
        .data('id', getNextItemIndex($parent))
        .append($('<div class="d-flex pr-2 pl-4">')
            .append('<div class="col-10 p-2 mb-3 mr-auto" style="border-bottom: solid 1px;">')
            .append($('<span class="px-1" style="cursor:pointer">' + deleteSvg)
                .click(function() {
                    removeItem(this);
                })))
        .appendTo($parent ? $parent : '#sortable');
};

const updateItem = () => {
    $(itemBeingEdited)
        .data('name', $('#newItemName').val())
        .data('url', $('#newItemURL').val())
        .data('tabtype', $('#type input:checked').val());
    $(itemBeingEdited).find('label').text($('#newItemName').val());
    $(itemBeingEdited).find('div.type').text($('#type input:checked').val() === '(Standard)' ? '' : $('#type input:checked').val());

    // $(itemBeingEdited).find('label').text($('#newItemName').val());
    // $(itemBeingEdited).find('input[name=url]').val($('#newItemURL').val());
    // $(itemBeingEdited).find('div.type').text($('#type input:checked').val());
    // $(itemBeingEdited)
    //     .attr('data-name', $('#newItemName').val())
    //     .attr('data-url', $('#newItemURL').val())
    //     .attr('data-tabtype', $('#type input:checked').val());
};

$('#addNewItemButton').click(() => {
    itemBeingEdited = null;
    $('#newItemName').val('');
    $('#newItemURL').val('');
    //TODO: reset Tab Type Radios
    $('#performAddButton').show();
    $('#performUpdateButton').hide();
});

$('#addNewGroupButton').click(() => {
    groupBeingEdited = null;
    $('#newGroupName').val('');
    $('#addEditGroupModal .performAddButton').show();
    $('#addEditGroupModal .performUpdateButton').hide();
});

$('#addSeparator').click(() => {
    addSeparator();
});

// Save To File
$('#saveFileButton').click(() => {
    let fileContents = $('#sortable').sortable('serialize').get(),
        element = document.createElement('a');
    fileContents = JSON.stringify(fileContents, null, '\t');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContents));
    element.setAttribute('download', 'ContextMenuSearchSetting.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
});

// Load From File
$('#loadFileButton').click(() => {
    if ($('#sortable > li').length > 0) {
        if (confirm('Loading from file will overwrite the existing structure.\nAre you sure you want to continue?')) {
            $('#loadFileInput').click();
        }
    } else {
        $('#loadFileInput').click();
    }
});

$('span.help30').click(() => {

});

const fileInputChanged = event => {
    let fileToLoad = event.target.files[0];
    if (fileToLoad) {
        $('#sortable').empty();
        let reader = new FileReader();
        reader.onload = fileLoadedEvent => {
            let textFromFileLoaded = fileLoadedEvent.target.result;
            JSON.parse(textFromFileLoaded).forEach(item => {
                loadItem(item);
            });
            //reset file input
            $('#loadFileInput').replaceWith($('#loadFileInput').val('').clone(true));
        };
        reader.readAsText(fileToLoad, 'UTF-8');
    }
};

$('#loadFileInput').change(event => {
    fileInputChanged(event);
});

$('#addEditItemForm').submit(e => {
    e.preventDefault();
    if ($('#addEditItemForm').valid()) {
        $('#addEditItemModal').modal('hide');
        //FIXME: validation doesn't work for URLs without %s
        //console.log('form submitted!');
        if (itemBeingEdited) {
            updateItem();
        } else {
            addNewItem($('#newItemName').val(), $('#newItemURL').val(), $('#type input:checked').val(), true);
        }
    }
});

$('#addEditGroupForm').submit(e => {
    e.preventDefault();
    if ($('#addEditGroupForm').valid()) {
        $('#addEditGroupModal').modal('hide');
        if (groupBeingEdited) {
            $(groupBeingEdited)
                .data('name', $('#newGroupName').val())
                .find('label:first').text($('#newGroupName').val());
        } else {
            addNewGroup($('#newGroupName').val(), true);
        }
    }
});

//Add rule for URL input to require "%s"
$.validator.addMethod(
    'mustinclude',
    function(value, element, textToInclude) {
        return value.includes(textToInclude);
    },
    'URL must incldue %s'
);

const renumberItems = () => {
    $('#sortable > li').each(function(index) {
        $(this).data('id', '0' + index);
        if ($(this).data('type') === 'group') {
            // show or hide the empty span marker
            if ($(this).find('> ol > li').length > 0) {
                $(this).find('span.marker').removeClass('empty');
            } else {
                $(this).find('span.marker').addClass('empty');
            }
            $(this).find('ol li').each(function(groupIndex) {
                $(this).data('id', 'G0' + index + groupIndex);
            });
        }
    });
};

$('#sortable').sortable({
    group: 'nested',
    tolerance: 6,
    distance: 10,
    onDragStart: ($item, container, _super) => {
        oldIndex = $item.index();
        _super($item, container);
    },
    onDrop: ($item, container, _super) => {
        if ($item.index() != oldIndex) {
            renumberItems();
        }
        _super($item, container);
    },
    serialize: function($parent, $children, parentIsContainer) {
        var result = $.extend({}, $parent.data());
        if (parentIsContainer) {
            return $children;
        } else if ($children[0]) {
            result.children = $children;
        }
        delete result.subContainers;
        delete result.sortable;

        return result;
    }
});

// $('#addEditItemForm').validate({
//     rules: {
//         newItemName: "required",
//         newItemURL: {
//             required: true,
//             url: true,
//             mustinclude: '%s'
//         }
//     },
//     messages: {
//         newItemName: "",
//         newItemURL: {
//             mustinclude: 'URL must include %s'
//         }
//     }
// });

// $('#newItemURL').rules("add", {
//     'mustinclude': "%s",
//     messages: {
//         mustinclude: "URL must include %s"
//     }
// });

$('#saveOptions').click(() => {
    // console.log($('#sortable').sortable("serialize").get());
    // console.log(JSON.stringify($('#sortable').sortable("serialize").get(), null, "\t"));
    chrome.storage.sync.set({
        'menuStructure': $('#sortable').sortable('serialize').get(),
        'includeOptionsItem': $('#includeOptionsItem')[0].checked
    }, () => {
        $('p.saveMessage').show();
        setTimeout(function() {
            $('p.saveMessage').fadeOut();
        }, 2000);
    });
});

const loadItem = (item, $parent) => {
    switch (item.type) {
        case 'item':
            addNewItem(item.name, item.url, item.tabtype, item.enabled, $parent);
            break;
        case 'group':
            let newGroupOL = addNewGroup(item.name, item.enabled, $parent);
            if (item.children) {
                item.children.forEach(childItem => {
                    loadItem(childItem, newGroupOL);
                });
            }
            break;
        case 'separator':
            addSeparator($parent);
    }
};

$('#resetOptions').click(() => {
    chrome.storage.sync.clear();
});

// loadSettings
chrome.storage.sync.get({
    'menuStructure': defaultMenuStructure,
    'includeOptionsItem': true
}, items => {
    //console.log(items.menuStructure);
    items.menuStructure.forEach(item => {
        loadItem(item);
    });
    $('#includeOptionsItem')[0].checked = items.includeOptionsItem;
    renumberItems();
});
