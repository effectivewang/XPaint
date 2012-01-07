//// THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF
//// ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO
//// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//// PARTICULAR PURPOSE.
////
//// Copyright (c) Microsoft Corporation. All rights reserved


(function () {
    'use strict';

    var palettes = [];

    function create(href) {
         return new WinJS.Promise(function (c) {
            var elem = document.createElement('div');

            // Need to wrap in the unsafe block as we use custom data-* properties on the HTML.
            window.msWWA.execUnsafeLocalFunction(function () {
                WinJS.UI.Fragments.clone(href)
                    .then(function (elements) {
                    elem.appendChild(elements);
                    document.body.appendChild(elem);

                    var flyout = new WinJS.UI.Flyout(elem, {});
                    WinJS.Binding.processAll(elem, window)
                            .then(function () {
                        WinJS.Resources.processAll(elem);
                        c(flyout);
                    });
                });
            });
        });
    }

    function reverseEventBind(source, properties, target, eventName) {
        var prop = properties.pop();
        target.addEventListener(eventName, function (e) {
            var item = WinJS.Utilities.getMember(properties.join('.'), source);
            item[prop] = parseInt(e.target.value, 10);

            // Nested bindables do not get notified of changes so we need to manually trigger an update.
            if (prop === 'r' || prop === 'g' || prop === 'b' || prop === 'a') {
                updateCurrentColor();
            }
        }, false);
    }

    function updateCurrentColor() {
        document.getElementById('colorPalette').style.backgroundColor = XPaint.colorToStyle(Settings.brush.color);
    }

    function swatchClicked(e) {
        var colors = e.target.style.backgroundColor.replace('rgba(', '').replace(')', '').split(',');
        var color = { r: colors[0], g: colors[1], b: colors[2], a: colors[3] * 100 };
        Settings.brush.color = WinJS.Binding.as(color);
    }

    function filterClicked(e) {
        var func = WinJS.Utilities.getMember(e.target.getAttribute('data-filter'), window);
        var progress = document.createElement('progress');
        e.target.appendChild(progress);
        func().then(function () {
            progress.removeNode();

            var parent = e.target.parentElement;
            while (parent.className.indexOf('win-flyout') < 0) {
                parent = parent.parentElement;
            }
            if (parent) {
                var flyout = WinJS.UI.getControl(parent);
                if (flyout) { flyout.hide(); }
            }
        });
    }

    function showPalette(palette, relativeTo) {
        var x = relativeTo.offsetLeft + relativeTo.clientWidth / 2;
        var y = App.appbar().offsetTop - 30;

        var elem = palette.element;
        elem.style.top = (y - elem.clientHeight) + 'px';
        elem.style.left = (x - elem.clientWidth / 2) + 'px';
        palette.show();
    }

    function togglePalette(palette, href, relativeTo) {
        if (!palettes[palette]) {
            this.create(href).
                then(function (p) {
                palettes[palette] = p;
                showPalette(palettes[palette], relativeTo);
            });
        }
        else {
            if (palettes[palette].element.style.visibility !== 'visible') {
                showPalette(palettes[palette], relativeTo);
            }
            else {
                palettes[palette].hide();
            }
        }
    }

    WinJS.Namespace.define('Palettes', {
        create: create,
        reverseEventBind: reverseEventBind,
        updateCurrentColor: updateCurrentColor,
        colorToStyle: WinJS.Binding.converter(Utility.colorToStyle),
        swatchClicked: swatchClicked,
        filterClicked: filterClicked,
        togglePalette: togglePalette,
        getPalette: function (name) { return palettes[name]; }
    });

})();