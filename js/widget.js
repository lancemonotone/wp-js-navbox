/*! Navbox Widget */
/* ENCODE FILE AS UTF-8 for international characters!!!
 */


// Utility functions
var searchStringInArray = function (str, strArray, exact) {
    var found = false;
    for (var j = 0; j < strArray.length; j++) {
        if (exact === true) {
            if (strArray[j].toLowerCase() === str.toLowerCase()) found = true;
        } else {
            if (strArray[j].toLowerCase().match(str.toLowerCase())) found = true;
        }
    }
    return found;
};

// IIFE - Immediately Invoked Function Expression
(function ($, window, document) {
    'use strict';
    // The $ is now locally scoped
    // Listen for the jQuery ready event on the document
    $(function () {
        jQuery.extend(jQuery.expr[':'], {
            focus: function (e) {
                try {
                    return e == document.activeElement;
                }
                catch (err) {
                    return false;
                }
            }
        });

        // Use placeholder attribute of input field if browser doesn't support it.
        if (!supports_attribute('input', 'placeholder')) {
            var active = document.activeElement;
            $(':text').focus(function () {
                if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
                    $(this).val('').removeClass('hasPlaceholder');
                }
            }).blur(function () {
                if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
                    $(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
                }
            }).blur();
            $(active).focus();
            $('form').submit(function () {
                $(this).find('.hasPlaceholder').each(function () {
                    $(this).val('');
                });
            });
        }

        // Initialize plugin on all .wms-navbox containers.
        // This is the widget wrapper for the searchform.
        // Disable for iPhone
        if ('1' !== WMS_NAVBOX_OBJECT.isIphone) {
            $('.wms-navbox input[type=text]').wms_typeahead([
                {
                    limit: 6,
                    minLength: 2,
                    name: 'flexiform',
                    valueKey: WMS_NAVBOX_OBJECT.valueKey,
                    tokensKey: WMS_NAVBOX_OBJECT.tokensKey,
                    urlKey: WMS_NAVBOX_OBJECT.urlKey,
                    local: WMS_NAVBOX_OBJECT.flexiform,
                    //remote: WMS_NAVBOX_OBJECT.ajaxurl + '?action=typeahead_search&fn=flexiform&terms=%QUERY',
                    /*prefetch: {
                     url: WMS_NAVBOX_OBJECT.dataurl + "flexiform.json",
                     ttl: 86400
                     },*/
                    template: '<a href="{{u}}"><span class="tt-value">{{v}}</span> <span class="tt-keywords note small"></span><span class="tt-tokens visuallyhidden">{{t}}</span></a>',
                    engine: Hogan
                },
                {
                    limit: 6,
                    minLength: 2,
                    name: 'ldap',
                    valueKey: WMS_NAVBOX_OBJECT.valueKey,
                    // ENCODE FILE AS UTF-8 !!!
                    charMap: {
                        'àáâãäå': 'a',
                        'èéêëæ': 'e',
                        'ç': 'c',
                        'ìíîï': 'i',
                        'ñ': 'n',
                        'òóôõöøœ': 'o',
                        'ùúûü': 'u',
                        'š': 's',
                        'ß': 'ss'
                    },
                    //tokensKey: WMS_NAVBOX_OBJECT.tokensKey, // don't need this...tokens generated from value
                    urlKey: WMS_NAVBOX_OBJECT.valueKey, // ldap url is based on value, ie, person name.
                    urlHelper: WMS_NAVBOX_OBJECT.peopleUrl,
                    local: WMS_NAVBOX_OBJECT.ldap,
                    //remote: WMS_NAVBOX_OBJECT.ajaxurl + '?action=typeahead_search&fn=ldap&terms=%QUERY',
                    /*prefetch: {
                     url: WMS_NAVBOX_OBJECT.dataurl + "ldap.json",
                     ttl: 86400
                     },*/
                    template: '<a href="' + WMS_NAVBOX_OBJECT.peopleUrl + '{{v}}"><span class="tt-value">{{v}}</span></a>',
                    engine: Hogan
                }
            ]).wmsNavbox();
        }

        /**
         * Display promos on search results page
         * @uses purl library (meerkat/js/purl.js)
         */
        var printSearchResults = function () {
            var $resultsNavboxContainer = $('#results-navbox-container');
            if ($('.bar-header[data-target=#web-content]').length && $resultsNavboxContainer.data('complete') !== '1') {
                var promos = [];
                var $query = $.url().data.param.query.q;
                if ('string' === typeof($query)) {
                    var $query_arr = $query.split(' ');
                    //var $flexiformData = $.parseJSON(window.localStorage.getItem('__flexiform__itemHash'));
                    //var $flexiformData = $.parseJSON(LZString.decompressFromUTF16(window.localStorage.getItem('__flexiform__itemHash')));
                    var $flexiformData = WMS_NAVBOX_OBJECT.flexiform;
                    for (var row in $flexiformData) {
                        var found = [];
                        for (var i = 0; i < $query_arr.length; i++) {
                            //found[i] = searchStringInArray($query_arr[i], $flexiformData[row].tokens, false);
                            found[i] = searchStringInArray($query_arr[i], $flexiformData[row].t, false);
                        }
                        if (found.every(Boolean)) { // if all elements of the found array are true.
                            //promos[$flexiformData[row].value] = $flexiformData[row].datum[WMS_NAVBOX_OBJECT.urlKey];
                            promos[$flexiformData[row].v] = $flexiformData[row].u;
                        }
                    }
                    if (Object.size(promos)) {
                        for (var name in promos) {
                            $('<div class="results-navbox"><a href="' + promos[name] + '"><span>' + name + '</span><br/><small>' + promos[name] + '</small></a></div>')
                                .appendTo('#results-navbox-container');
                        }
                        $resultsNavboxContainer.data('complete', '1').fadeIn();
                    }
                }
            }
        };

        $(document).ready(function () {
            window.setTimeout(printSearchResults, 1000);
        });
    });

    /**
     * Determines if HTML5 attribute is supported by user's browser.
     */
    function supports_attribute(el, attr) {
        var i = document.createElement(el);
        return attr in i;
    }

    $.wmsNavbox = function (element, options) {
        var defaults = {};

        // To avoid confusion, use "plugin" to reference the
        // current instance of the object
        var plugin = this;
        plugin.settings = {};

        plugin.element = $(element); // .wms-navbox-input: reference to the jQuery version of DOM element

        // cache elements
        plugin.form = plugin.element.parents('form');
        plugin.cancel = plugin.element.parent().siblings('.wms-navbox-cancel');
        plugin.go = plugin.element.parent().siblings('.wms-navbox-button');
        plugin.ttview = plugin.element.data('ttView');
        // remove backspace from special_keys for matching hints
        plugin.special_keys = special_keys;
        delete plugin.special_keys["8"];

        // the "constructor" method that gets called when the object is created
        plugin.init = function () {

            // the plugin's final properties are the merged default and
            // user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options);

            // code goes here

            // blur on click outside element
            $(document).mouseup(function (e) {
                blur(e);
            });

            // Focus
            plugin.element.focus(focus);

            // Typing
            plugin.element.keyup(function (e) {
                // specials_keys depends on jquery.hotkeys
                if (!plugin.special_keys[e.which || e.keyCode]) {
                    throttle(matchToken(), 250);
                }
            });

            // Clear/cancel
            plugin.cancel.click(function (e) {
                //hide();
                clear();
                plugin.element.focus();
            });

            // Add hotkeys for Search (alt+s) and Escape (esc).
            $.hotkeys.add('alt+s', function (e) {
                $(".wms-navbox-input").filter(':last').focus();
                e.preventDefault();
                matchToken();
            });

            plugin.element.bind('keydown.esc', function (e) {
                if (e.keyCode == 27 || e.key == "Esc") {
                    hide();
                }
            });

            // Input field remains in active state while suggestion block is visible.
            plugin.element.find('.tt-dropdown-menu').watch('display', function () {
                if ($(this).css('display') == 'block') {
                    focus();
                } else {
                    hide();
                }
            });

            plugin.ttview.dropdownView.on('suggestionSelected', function (e) {
                gaqTracker(e);
            });

            plugin.ttview.inputView.on('enterKeyed', function (e) {
                gaqTracker(e);
            });

            plugin.go.click(function (e) {
                gaqTracker(e);
            });
        };

        var gaqTracker = function (e) {
            // Exit if Google Analytics isn't loaded
            if (!Object.size(_gaq)) return;

            // Get selected suggestion if one exists. 'element' is input box. 'data' holds TypeaheadView instance.
            var selection = plugin.element.data('ttView').dropdownView._getSuggestions().filter(".tt-is-under-cursor").first();
            var type, value, url, token;

            // If this is a search event
            if (e.type == 'click') {
                type = 'Search Click';
                value = plugin.element.val();
            } else if (e.type == 'enterKeyed' && !selection.is('div')) {
                type = 'Search Enter';
                value = plugin.element.val();
            }

            // If this is a suggestion click
            else if (e.type == 'suggestionSelected') {
                value = e.data.value;
                if (e.data.dataset == 'flexiform') {
                    type = 'Link Click';
                    token = selection.find('.tt-keywords').text();
                    url = e.data.datum[WMS_NAVBOX_OBJECT.urlKey];
                    value = value + ' | ' + url + ' | ' + token;
                } else if (e.data.dataset == 'ldap') {
                    type = 'People Click';
                }
            }

            // If this is a suggestion enter
            else if (e.type == 'enterKeyed' && selection.is('div')) {
                value = plugin.element.val();
                if (selection.parents('.tt-dataset-flexiform').is('div')) {
                    type = 'Link Enter';
                    token = selection.find('.tt-keywords').text();
                    url = selection.find('a').attr('href');
                    value = value + ' | ' + url + ' | ' + token;
                } else if (selection.parents('.tt-dataset-ldap').is('div')) {
                    type = 'People Enter';
                }
            }
            //console.log(['_trackEvent', 'Navbox', type, value]);
            _gaq.push(['_trackEvent', 'Navbox', type, value]);
        };

        // Display list of matched tokens after hint
        var matchToken = function () {
            // input value
            var val = plugin.element.val();
            // input as regex for bold
            var re = new RegExp(val, "gi");
            // get list of tokens from template
            var $tokens = plugin.element.data('ttView').$node.find('.tt-tokens');
            $tokens.each(function () {
                // cache elements
                var $ttvalue = $(this).siblings('.tt-value');
                var $ttkeywords = $(this).siblings('.tt-keywords');

                var token_arr = $(this).text().split(',');
                var found = searchStringInArray(val, token_arr);

                if (-1 < found) {
                    var rf = new RegExp(token_arr[found]);
                    if ($ttvalue.text().match(rf)) {
                        var text = $ttvalue.text();
                        found = text.replace(re, '<strong>$&</strong>');
                        $ttvalue.html(found);
                    } else {
                        $ttkeywords.html(token_arr[found]);
                    }
                }
            });
        };

        var throttle = function (fn, threshhold, scope) {
            threshhold || (threshhold = 250);
            var last,
                deferTimer;
            return function () {
                var context = scope || this;

                var now = +new Date,
                    args = arguments;
                if (last && now < last + threshhold) {
                    // hold on to it
                    clearTimeout(deferTimer);
                    deferTimer = setTimeout(function () {
                        last = now;
                        fn.apply(context, args);
                    }, threshhold);
                } else {
                    last = now;
                    fn.apply(context, args);
                }
            };
        };

        // if the target of the click isn't the container or a descendant of the container
        var blur = function (e) {
            if (!plugin.element.is(e.target) && plugin.element.has(e.target).length === 0) {
                hide();
            }
        };
        // Clear the input.
        var clear = function () {
            plugin.element.val('').wms_typeahead('setQuery', '');
        };
        // Hide the interface.
        var hide = function () {
            plugin.element.parents('.wms-navbox').removeClass('active');
        };
        // Activate the input.
        var focus = function () {
            $(this).wms_typeahead('setQuery', $(this).val());
            plugin.element.parents('.wms-navbox').addClass('active');
            matchToken();
        };

        // call the "constructor" method
        plugin.init();

    };

    // add the plugin to the jQuery.fn object
    $.fn.wmsNavbox = function (options) {
        //window.localStorage.clear();
        options = $.extend(options, {selector: this.selector});

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function () {

            // if plugin has not already been attached to the element
            if (undefined == $(this).data('wmsNavbox')) {

                // create a new instance of the plugin
                // pass the DOM element and the user-provided options as arguments
                var plugin = new $.wmsNavbox(this, options);
                $(this).data('wmsNavbox', plugin);

            }

        });

    };

    // Does object exist?
    Object.size = function (obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

})(window.jQuery, window, document);