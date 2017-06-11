export function trimmer(string, charlist) {
    string = ltrim(string, charlist);
    return rtrim(string, charlist);
};

export function ltrim(string, charlist) {
    string = string || '';
    charlist = charlist || 's';
    return string.replace(new RegExp(`^[${charlist}]*`), ''); 
};

export function rtrim(string, charlist) {
    string = string || '';
    charlist = charlist || 's';
    return string.replace(new RegExp(`[${charlist}]*$`), ''); 
};

export function getURI() {
    return document.location.pathname;
}

export function removeActiveClassFromParentListItems() {
    $('#app-navbar-collapse ul').children('li.active').removeClass('active');
}

export function addActiveClassToParentListItem(element) {
    $(element).parent().filter('li').addClass('active');
}

export function extend(to, from) {
    for (let key in from) {
        to[key] = from[key];
    }
    return to;
}

/**
 * Create an instance of summernote
 * @param  {string} id ID of textarea to transform
 * @return {object}
 */
export function createSummernote(id) {
    var editor = $(`#${id}`).summernote({
        minHeight: 300,
        defaultFontName: 'Tahoma',
        disableResizeEditor: true,
        dialogsInBody: true
    });

    $('.note-editor').css({'height': '100%'});
    $('.note-editing-area').css({'height': 'inherit'})
    $('.note-resizebar').hide();

    return editor;
}

/**
 * Debounce
 *
 * Usage: function(){}.debounce(threshold);
 *
 * @param  {int} threshold How long to hold of on execution
 * @return {function}
 */
Function.prototype.debounce = function(threshold) {
    var callback = this;
    var timeout;
    return function () {
        var context = this;
        var params = arguments;
        window.clearTimeout(timeout);
        timeout = window.setTimeout(function () {
            callback.apply(context, params);
        }, threshold);
    };
};