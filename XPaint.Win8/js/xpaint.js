(function () {

    var tool;

    function hookupAppbarEvents() {
        var elements = document.getElementsByClassName('win-command');

        for (e in elements) {
            var el = elements.item(e);
            if (el != undefined) {
                el.addEventListener('click', function () {
                    var target = arguments[0].target;

                    var toolName = "XPaint." + target.id;
                    var tool = new Function("return new " + toolName + "();")();

                    var appbar = document.getElementById("appbar");
                    var paletteName, paletteHTML;

                    paletteName = toolName;
                    paletteHTML = tool.view;

                    XPaint.setTool(tool);

                    Palettes.togglePalette(paletteName, paletteHTML, target);
                }, false);
            }
        }
    }

    function hookupcanvasEvents() {
        var painting = false;

        function move(e) {
            if (XPaint.getTool() == null || !painting) return;

            XPaint.getTool().move(e);
        }

        function up(e) {
            if (XPaint.getTool() == null || !painting) return;

            painting = false;
            XPaint.getTool().up(e);
        }

        function down(e) {
            if (XPaint.getTool() == null) return;

            painting = true;
            XPaint.getTool().down(e);
        }

        var canvas = document.getElementById('xpaint');
        canvas.height = window.screen.height;
        canvas.width = window.screen.width;

        layers = layerManager.createLayers(canvas);

        canvas.addEventListener('MSPointerDown', down, false);
        canvas.addEventListener('MSPointerMove', move, false);
        canvas.addEventListener('MSPointerUp', up, false);

        document.getElementById('appbar').addEventListener('MSPointerMove', up, false);
    }

    function onload(elements, state) {
        hookupAppbarEvents();
        hookupcanvasEvents();

        XPaint.setTool(new XPaint.BrushTool());
    }

    WinJS.Application.addEventListener('fragmentappended', function handler(e) {
        if (e.location === '/html/xpaint.html') { onload(e.fragment, e.state); }
    });

    try {
        var appLayout = Windows.UI.ViewManagement.ApplicationLayout.getForCurrentView();
        if (appLayout) {
            appLayout.addEventListener('layoutchanged', function (e) {
                if (WinJS.Navigation.location === '/html/xpaint.html') {
                    if (e.layout === Windows.UI.ViewManagement.ApplicationLayoutState.snapped) {
                        onGalleryClicked();
                    }
                }
            });
        }
    }
    catch (ex) { }

    WinJS.Namespace.define('XPaint', {
        width: function () { return layerManager.defaultLayer.width; },
        height: function () { return layerManager.defaultLayer.height; },
        getTool: function () { return tool; },
        setTool: function (t) { return tool = t; }
    });
})();