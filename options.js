/*globals confirm, chrome, defaultMenuStructure, jQuery */

// svg for use with img classes, updated via the injectSvg function
const
    addSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22"><path d="m18 12h-6v6h-2v-6h-6v-2h6v-6h2v6h6v2z"/></svg>',
    addCircleSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16"><path id="XMLID_16_" d="M8,1C4.1,1,1,4.1,1,8s3.1,7,7,7s7-3.1,7-7S11.9,1,8,1z M12,9H9v3H7V9H4V7h3V4h2v3h3V9z"/></svg>',
    cancelSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>',
    help30Svg = '<svg xmlns="http://www.w3.org/2000/svg" height="30" width="30"><path fill="#007bff" d="m15 0c-8.2 0-15 6.8-15 15s6.8 15 15 15 15-6.8 15-15c0-8.3-6.7-15-15-15zm1.8 24.8c-0.5 0.5-1 0.8-1.8 0.8-0.7 0-1.3-0.2-1.7-0.8-0.4-0.4-0.8-1.1-0.8-1.8s0.2-1.3 0.8-1.7c0.4-0.4 1.1-0.8 1.7-0.8s1.3 0.2 1.8 0.8c0.5 0.5 0.8 1.1 0.8 1.7-0.1 0.7-0.3 1.3-0.8 1.8zm4.2-13.3c-0.2 0.4-0.3 0.8-0.5 1.2s-0.5 0.8-0.8 1.1-0.6 0.7-1 1l-0.8 0.8c-0.2 0.2-0.4 0.5-0.5 0.8-0.2 0.2-0.2 0.5-0.3 0.8-0.1 0.1-0.1 0.4-0.1 0.7v0.4h-3.8v-1c0-0.4 0.1-0.9 0.1-1.3 0.1-0.4 0.2-0.7 0.5-1.1s0.5-0.8 0.8-1.1c0.3-0.4 0.8-0.8 1.3-1.2s0.9-0.9 1.2-1.3 0.5-0.8 0.5-1.4-0.2-1.1-0.7-1.5-1.1-0.7-1.8-0.7c-0.4 0-0.8 0.1-1.1 0.2-0.3 0.3-0.6 0.4-0.8 0.7s-0.4 0.5-0.6 0.8-0.3 0.6-0.4 0.9l-3.3-1.3c0.1-0.5 0.3-1.1 0.7-1.6 0.3-0.5 0.8-1.1 1.3-1.4 0.5-0.4 1.1-0.8 1.8-1.1 0.6-0.3 1.4-0.4 2.3-0.4s1.7 0.2 2.6 0.4c0.8 0.3 1.4 0.7 1.9 1.1 0.5 0.5 1 1.1 1.3 1.7s0.4 1.3 0.4 2.2c0 0.6-0.1 1.1-0.2 1.6z"/></svg>',
    loadFileSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-587 389 24 24" height="24" width="24"><path d="m-573 391h-8c-1.1 0-2 0.9-2 2v16c0 1.1 0.9 2 2 2h5v-6h-3l4-4 4 4h-3v6h5c1.1 0 2-0.9 2-2v-12l-6-6zm-1 7v-5.5l5.5 5.5h-5.5z"/></svg>',
    playlistAddSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"/></svg>',
    saveSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
    saveFileSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m14 2h-8c-1.1 0-2 0.9-2 2v16c0 1.1 0.9 2 2 2h6l-4-4h3v-6h2v6h3l-4 4h6c1.1 0 2-0.9 2-2v-12l-6-6zm-1 7v-5.5l5.5 5.5h-5.5z"/></svg>',
    updateSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path id="XMLID_14_" d="M21,10.1h-6.8l2.7-2.8C14.2,4.6,9.7,4.5,7,7.2C4.3,9.9,4.3,14.3,7,17c2.7,2.7,7.1,2.7,9.9,0 c1.4-1.3,2-2.9,2-4.9h2c0,2-0.9,4.5-2.6,6.3c-3.5,3.5-9.2,3.5-12.7,0s-3.5-9.1,0-12.6s9.1-3.5,12.7,0L21,3L21,10.1L21,10.1z"/></svg>';

// svg used in code below
const
    deleteSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" data-toggle="tooltip" title="Delete"><path d="m13.1 13.5-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4 2.1-2.1 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4zm1.4-6.5-1-1h-5l-1 1h-3.5v2h14v-2h-3.5zm-9.5 15c0 1.1 0.9 2 2 2h8c1.1 0 2-0.9 2-2v-12h-12v12zm2-10h8v10h-8v-10z"/></svg>',
    editSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" data-toggle="tooltip" title="Edit"><path d="m13.1 12 0.9 0.9-9.1 9.1h-0.9v-0.9l9.1-9.1m3.6-6c-0.3 0-0.5 0.1-0.7 0.3l-1.8 1.8 3.8 3.8 1.8-1.8c0.4-0.4 0.4-1 0-1.4l-2.3-2.3c-0.3-0.3-0.6-0.4-0.8-0.4zm-3.6 3.2-11.1 11.1v3.7h3.8l11.1-11.1-3.8-3.7z"/></svg>',
    moveSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" ><path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"/></svg>',
    removeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"><path d="M11.8,13.7l2-2c0.3-0.3,0.3-0.9,0-1.2L10.2,7l3.5-3.5c0.3-0.3,0.3-0.9,0-1.2l-2-2c-0.3-0.3-0.9-0.3-1.2,0 L7,3.8L3.5,0.3c-0.3-0.3-0.9-0.3-1.2,0l-2,2c-0.3,0.3-0.3,0.9,0,1.2L3.8,7l-3.5,3.5c-0.3,0.3-0.3,0.9,0,1.2l2,2 c0.3,0.3,0.9,0.3,1.2,0L7,10.2l3.5,3.5C10.9,14.1,11.4,14.1,11.8,13.7z"/></svg>';

let itemBeingEdited,
    groupBeingEdited,
    /**
     * Used to store original index of an item during sortable drag-drop.
     * @type {number}
     */
    oldIndex,
    /**
     * Used to assign unique ids to generated item enabled checkboxes.
     * @type {number}
     */
    counter = 0;

const svgImgSpan = svg => ('<span class="icon">' + svg + '</span>');

(function injectSvg() {
    $('img.add').replaceWith(svgImgSpan(addSvg));
    $('img.addCircle').replaceWith(svgImgSpan(addCircleSvg));
    $('img.cancel').replaceWith(svgImgSpan(cancelSvg));
    $('img.help30').replaceWith(svgImgSpan(help30Svg));
    $('img.loadFile').replaceWith(svgImgSpan(loadFileSvg));
    $('img.playlist-add').replaceWith(svgImgSpan(playlistAddSvg));
    $('img.save').replaceWith(svgImgSpan(saveSvg));
    $('img.saveFile').replaceWith(svgImgSpan(saveFileSvg));
    $('img.update').replaceWith(svgImgSpan(updateSvg));
})();

(function ($) {
    $.fn.addUrlsTooltip = function () {
        return this.each(function () {
            let urls = $(this).data('urls'),
                label = $(this).find('label'),
                title = '';
            if (urls) {
                urls.forEach(url => {
                    title = title + url + '<br />';
                });
                label.tooltip('dispose');
                label.tooltip({
                    title: title,
                    template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner" style="max-width: none;    text-align: inherit;"></div></div>',
                    html: true
                });
            }
        });
    };
}(jQuery));

const getNextItemIndex = ($parent) => {
    if ($parent) {
        return 'G' + $parent.closest('li').data('id') + $parent.find(' li').length;
    } else {
        return '0' + $('#sortable > li').length;
    }
};

const renumberItems = () => {
    $('#sortable > li').each(function (index) {
        $(this).data('id', '0' + index);
        if ($(this).data('type') === 'group') {
            // show or hide the empty span marker
            $(this).find('span.marker').toggleClass('empty', $(this).find('> ol > li').length === 0);

            // if ($(this).find('> ol > li').length > 0) {
            //     $(this).find('span.marker').removeClass('empty');
            // } else {
            //     $(this).find('span.marker').addClass('empty');
            // }
            $(this).find('ol li').each(function (groupIndex) {
                $(this).data('id', 'G0' + index + groupIndex);
            });
        }
    });
};

const removeItem = (deleteButton) => {
    let $li = $(deleteButton).closest('li');
    let msg = 'Are you sure you want to delete this ' + $li.data('type') + '?';
    if ($li.data('type') === 'group') {
        msg += '\nAll nested items will be deleted as well!';
    }
    if (confirm(msg)) {
        $(deleteButton).find('[data-toggle="tooltip"]').tooltip('dispose');
        $li.remove();
        renumberItems();
    }
};

const configureItemUrls = () => {
    $('#item-url-list').toggleClass('single', $('#item-url-list li').length === 1);
};

// validate Display Name (for both Item & Group)
const validateName = e => {
    let $input = $(e.currentTarget),
        inputVal = e.type === 'change' ? $input.val($input.val().trim()).val() : $input.val(),
        isValid = true;
    if (!inputVal) {
        $input.tooltip({ title: 'Name cannot be blank' });
        isValid = false;
    } else {
        $input.tooltip('dispose');
    }
    $input.toggleClass('error', !isValid);
};

// validate URL input
const validateUrl = e => {
    let $input = $(e.currentTarget),
        inputVal = e.type === 'change' ? $input.val($input.val().trim()).val() : $input.val(),
        isValid = false;
    if (!inputVal) {
        $input.tooltip({ title: 'URL cannot be empty' });
        isValid = false;
    } else {
        $input.tooltip('dispose');
        // test for valid URL
        let isValidUrl = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(inputVal.replace('%s', '')),
            includesPercentS = inputVal.includes('%s');
        if (!isValidUrl) {
            $input.tooltip({ title: 'Please enter a valid URL' });
            isValid = false;
        } else {
            isValid = true;
            if (includesPercentS) {
                $input.removeClass('caution');
            } else {
                $input.tooltip({ title: 'URL should contain the string \'%s\'' });
                $input.addClass('caution');
            }
        }
    }
    $input.toggleClass('error', !isValid);
};

const addUrlInput = (url) => {
    $('<li class="input-group mb-2">')
        .append('<div class="input-group-prepend"><span class="input-group-text" style="cursor:move;padding: 0.375rem;">' + moveSvg)
        .append($('<input type="url" class="form-control" placeholder="URL" required mustinclude="%s">').val(url)
            .on('keyup change', validateUrl))
        .append($('<div class="input-group-append">')
            .append($('<button class="btn btn-danger" type="button" data-toggle="tooltip" title="Remove">' + removeSvg + '</button>')
                .click(function () {
                    $('.tooltip').hide();
                    $(this).closest('li.input-group').remove();
                    configureItemUrls();
                }).tooltip()))
        .appendTo('#item-url-list');
    configureItemUrls();
};

const updateItemModalUrls = urls => {
    urls = urls || [''];
    // clear the urls
    $('#item-url-list').empty();
    // add urls
    urls.forEach(url => {
        addUrlInput(url);
    });
};

const updateItemModal = (span) => {
    itemBeingEdited = $(span).closest('li');
    $('#item-name').val(itemBeingEdited.data('name')).removeClass('error');
    updateItemModalUrls(itemBeingEdited.data('urls'));
    $('#type input[value="' + itemBeingEdited.data('tabtype') + '"]')[0].checked = true;
    $('#item-is-active')[0].checked = itemBeingEdited.data('active');
    $('#add-item').hide();
    $('#update-item').show();
    $('#item-modal .modal-title').text('Edit Item');
};

const addNewItem = (item, $parent) => {
    counter += 1;
    $('<li class="border border-bottom-0">')
        .data('type', 'item')
        .data('id', getNextItemIndex($parent))
        .data('name', item.name)
        .data('tabtype', item.tabtype)
        .data('enabled', item.enabled)
        .data('urls', item.urls)
        .data('active', item.active)
        .append($('<div class="d-flex px-2">')
            .append($('<div class="mr-auto py-1 d-flex">')
                .append($('<div class="custom-control custom-checkbox">')
                    .append('<input type="checkbox" class="custom-control-input position-static" id="isEnabled' + counter +
                        '" data-toggle="tooltip" title="Enabled?" ' + (item.enabled ? 'checked' : '') + '>')
                    .append('<label class="custom-control-label" for="isEnabled' + counter + '">' + item.name))
                .append('<div class="ml-1 type align-self-center mb-1">' + (item.tabtype === '(Standard)' ? '' : item.tabtype)))
            .append($('<span class="px-1" style="cursor:pointer" data-toggle="modal" data-target="#item-modal">' + editSvg)
                .click(function () {
                    updateItemModal(this);
                }))
            .append($('<span class="px-1" style="cursor:pointer" title="Delete">' + deleteSvg)
                .click(function () {
                    removeItem(this);
                })))
        .appendTo($parent ? $parent : '#sortable')
        .addUrlsTooltip()
        .find('[data-toggle="tooltip"]').tooltip();
};

// Delegated Change Event Handlers for the Enabled checkboxes
$('#sortable').on('change', 'input:checkbox', function () {
    $(this).closest('li').data('enabled', this.checked);
});

const addNewGroup = (groupName, enabled, $parent) => {
    counter += 1;
    let ol = $('<ol>');
    $('<li class="border border-bottom-0 position-relative">')
        .data('type', 'group')
        .data('name', groupName)
        .data('enabled', enabled)
        .data('id', getNextItemIndex($parent))
        .append($('<div class="d-flex px-2">')
            .append($('<div class="custom-control custom-checkbox mr-auto py-1">')
                .append('<input type="checkbox" class="custom-control-input position-static" id="isEnabled' + counter +
                    '" data-toggle="tooltip" title="Enabled?" ' + (enabled ? 'checked' : '') + '>')
                .append('<label class="custom-control-label" for="isEnabled' + counter + '">' + groupName))
            .append($('<span class="px-1" style="cursor:pointer" data-toggle="modal" data-target="#group-modal">' + editSvg)
                .click(function () {
                    groupBeingEdited = $(this).closest('li');
                    $('#group-name').val(groupBeingEdited.data('name'));
                    $('#add-group').hide();
                    $('#update-group').show();
                    $('#group-modal .modal-title').text('Edit Group');
                }))
            .append($('<span class="px-1" style="cursor:pointer">' + deleteSvg)
                .click(function () {
                    removeItem(this);
                }))
            .append('<span class="marker empty" data-toggle="tooltip" title="Empty group, will not be created">'))
        .append(ol)
        .appendTo($parent ? $parent : '#sortable')
        .find('[data-toggle="tooltip"]').tooltip();
    //console.log(ol);
    return ol;
};

const addSeparator = ($parent) => {
    $('<li class="border border-bottom-0">')
        .data('type', 'separator')
        .data('id', getNextItemIndex($parent))
        .append($('<div class="d-flex pr-2 pl-4">')
            .append('<div class="col-10 p-2 mb-3 mr-auto" style="border-bottom: solid 1px;">')
            .append($('<span class="px-1" style="cursor:pointer">' + deleteSvg)
                .click(function () {
                    removeItem(this);
                })))
        .appendTo($parent ? $parent : '#sortable')
        .find('[data-toggle="tooltip"]').tooltip();
};

const loadItem = (item, $parent) => {
    switch (item.type) {
        case 'item':
            addNewItem(item, $parent);
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

const updateItem = (item) => {
    $(itemBeingEdited)
        .data('name', item.name)
        .data('urls', item.urls)
        .data('tabtype', item.tabtype)
        .data('active', item.active)
        .addUrlsTooltip();
    $(itemBeingEdited).find('label').text(item.name);
    $(itemBeingEdited).find('div.type').text(item.tabtype === '(Standard)' ? '' : item.tabtype);
};

$('#open-item-modal').click(() => {
    itemBeingEdited = null;
    $('#item-name').val('').removeClass('error');
    updateItemModalUrls();
    $('#type input[value="(Standard)"]')[0].checked = true;
    $('#item-is-active')[0].checked = $('#default-active')[0].checked;
    $('#add-item').show();
    $('#update-item').hide();
    $('#item-modal .modal-title').text('Add New Item');
});

$('#open-group-modal').click(() => {
    groupBeingEdited = null;
    $('#group-name').val('');
    $('#add-group').show();
    $('#update-group').hide();
    $('#group-modal .modal-title').text('Add New Group');
});

$('#add-separator').click(() => {
    addSeparator();
});

$('#add-url').click(() => {
    addUrlInput();
});

// Save To File
$('#save-to-file').click(() => {
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
$('#load-file').click(() => {
    if ($('#sortable > li').length > 0) {
        if (confirm('Loading from file will overwrite the existing structure.\nAre you sure you want to continue?')) {
            $('#load-file-input').click();
        }
    } else {
        $('#load-file-input').click();
    }
});

const fileInputChanged = event => {
    let fileToLoad = event.target.files[0];
    if (fileToLoad) {
        $('#sortable').empty();
        let reader = new FileReader();
        reader.onload = fileLoadedEvent => {
            let textFromFileLoaded = fileLoadedEvent.target.result;
            //console.log(JSON.parse(textFromFileLoaded));
            JSON.parse(textFromFileLoaded).forEach(item => {
                loadItem(item);
            });
            //reset file input
            $('#load-file-input').replaceWith($('#load-file-input').val('').clone(true));
        };
        reader.readAsText(fileToLoad, 'UTF-8');
    }
};

$('#load-file-input').change(event => {
    fileInputChanged(event);
});

$('#add-item, #update-item').click(() => {
    validateName({ currentTarget: $('#item-name') });
    $('#item-url-list li input').each(function () {
        validateUrl({ currentTarget: this });
    });
    if ($('#item-modal .error').length === 0) {
        $('#item-modal').modal('hide');
        let item = {
            name: $('#item-name').val(),
            tabtype: $('#type input:checked').val(),
            enabled: true,
            active: $('#item-is-active')[0].checked,
            urls: []
        };
        $('#item-modal div.urls input').each(function () {
            item.urls.push($(this).val());
        });
        if (itemBeingEdited) {
            updateItem(item);
        } else {
            addNewItem(item);
        }
    } else {
        $('#item-modal .error').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    }
});

$('#add-group, #update-group').click(() => {
    validateName({ currentTarget: $('#group-name') });
    if ($('#group-modal .error').length === 0) {
        $('#group-modal').modal('hide');
        if (groupBeingEdited) {
            $(groupBeingEdited)
                .data('name', $('#group-name').val())
                .find('label:first').text($('#group-name').val());
        } else {
            addNewGroup($('#group-name').val(), true);
        }
    } else {
        $('#group-modal .error').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    }
});

$('#item-name').on('keyup change', validateName);

// a flat array of all the items
const getItems = (obj) => {
    let items = [];
    if (!obj) {
        obj = $('#sortable').sortable('serialize').get();
    }
    if (obj instanceof Array) {
        obj.forEach(item => {
            items = items.concat(getItems(item));
        });
    } else if (obj.type === 'item') {
        items.push(obj);
    } else if (obj.children) {
        items = items.concat(getItems(obj.children));
    }
    return items;
};

$('#add-preset').click(() => {
    // TODO: Finish Presets
    $('#preset-modal').modal('hide');
    //build a flat array of existing items that can be filtered to search for existing preset
    let items = getItems();

    if (items) {

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});

$('#sortable').sortable({
    group: 'nested',
    tolerance: 6,
    distance: 4,
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
    serialize: function ($parent, $children, parentIsContainer) {
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

$('#item-url-list').sortable({
    tolerance: 6,
    distance: 4
});

// save settings
$('#save-options').click(() => {
    // console.log($('#sortable').sortable("serialize").get());
    // console.log(JSON.stringify($('#sortable').sortable("serialize").get(), null, "\t"));
    chrome.storage.sync.set({
        'menuStructure': $('#sortable').sortable('serialize').get(),
        'includeOptionsItem': $('#include-options')[0].checked,
        'isDefaultActive': $('#default-active')[0].checked
    }, () => {
        $('p.saveMessage').show();
        setTimeout(function () {
            $('p.saveMessage').fadeOut();
        }, 2000);
    });
});

$('#resetOptions').click(() => {
    chrome.storage.sync.clear();
});

$('[data-toggle="tooltip"]').tooltip();

// load Settings
chrome.storage.sync.get({
    'menuStructure': defaultMenuStructure,
    'includeOptionsItem': true,
    'isDefaultActive': true
}, items => {
    //console.log(items.menuStructure);
    items.menuStructure.forEach(item => {
        loadItem(item);
    });
    $('#include-options')[0].checked = items.includeOptionsItem;
    $('#default-active')[0].checked = items.isDefaultActive;
    renumberItems();
});
