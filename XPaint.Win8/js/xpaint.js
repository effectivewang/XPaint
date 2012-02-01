(function () {

    this.tool = null;
    this.tools = {};

    function createTool(target) {
        var toolName = target.id;
        var toolFullName = "XPaint." + target.id;

        var tool = tools[target.id];

        if (tool == null) {
            tool = new Function("return new " + toolFullName + "();")();
            tools[toolName] = tool;
        }

        var appbar = document.getElementById("appbar");
        var paletteName, paletteHTML;

        paletteName = toolName;
        paletteHTML = tool.view;

        XPaint.setTool(tool);

        if (tool.view != null) {
            Palettes.togglePalette(paletteName, paletteHTML, target);
        }
    }

    function updateHistoryState() {
        document.getElementById('undo').disabled = !XPaint.history.canUndo();
        document.getElementById('redo').disabled = !XPaint.history.canRedo();
    }

    function hookupAppbarEvents() {
        var elements = document.getElementsByClassName('win-command');

        for (e in elements) {
            var el = elements.item(e);
            if (el != undefined) {
                el.addEventListener('click', function () {
                    var target = arguments[0].target;

                    if (target.id == 'undo') {
                        XPaint.history.undo();
                        updateHistoryState();
                    }
                    else if (target.id == 'redo') {
                        XPaint.history.redo();
                        updateHistoryState();
                    }
                    else {
                        createTool(target);
                    }
                }, false);
            }
        }
    }

    function hookupcanvasEvents() {
        var painting = false;
        XPaint.history = new  XPaint.history();

        var command = null;
        function move(e) {
            if (XPaint.getTool() == null || !painting) return;

            XPaint.getTool().move(e);
        }

        function up(e) {
            if (XPaint.getTool() == null || !painting) return;

            painting = false;
            XPaint.getTool().up(e);

            if (command != null) {
                command.execute();
                XPaint.history.queue(command);
            }
            updateHistoryState();
        }

        function down(e) {
            if (XPaint.getTool() == null) return;

            painting = true;
            XPaint.getTool().down(e);

            command = new XPaint.command();
        }

        var conatainer = document.getElementById('layerHost');
        conatainer.height = window.screen.height;
        conatainer.width = window.screen.width;

        layers = layerManager.createLayers(conatainer);

        conatainer.addEventListener('MSPointerDown', down, false);
        conatainer.addEventListener('MSPointerMove', move, false);
        conatainer.addEventListener('MSPointerUp', up, false);

        document.getElementById('appbar').addEventListener('MSPointerMove', up, false);
    }

    function setTool(t) {
        if (t == null) return;

        if (tool != null && tool.deactive != null) {
            tool.deactive();
        }

        if (t.active != null) {
            t.active();
        }

        function getToolId(t) {
            var toolName = null;
            for (var v in tools) {
                if (tools[v] === t) {
                    toolName = v;
                    break;
                }
            }

            return toolName;
        }

        if (tool != null) {
            WinJS.Utilities.removeClass(document.querySelector('#' + getToolId(tool) + ' .win-commandicon'), 'activetool');
        }

        WinJS.Utilities.addClass(document.querySelector('#' + getToolId(t) + ' .win-commandicon'), 'activetool');

        return tool = t;
    }

    function onload(elements, state) {
        hookupAppbarEvents();
        hookupcanvasEvents();

        var t = new XPaint.BrushTool();
        tools["BrushTool"] = t;
        XPaint.setTool(t);
    }

    function setCursor(cursor) {
        document.getElementById('layerHost').style.cursor = cursor;
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
        curTool: {
            get: function () { return tool; }
        },
        setTool: setTool,
        setCursor: setCursor
    });
})();