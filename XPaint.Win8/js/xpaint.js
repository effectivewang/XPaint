(function () {
    

    var erasing = false,
        canvas = null,
        ctx = null,
        history = new XPaint.history();
        palettes = { size: null, brush: null, eraser: null },
        imageIndex = null;

    function onToolClicked() {
        var targetTool = arguments[0].target;

        var toolName = "XPaint." + targetTool.id;     
        this.tool = new Function("return new " + toolName + "();")();

    }

    function drawImage() {

    }

    function hookupAppbarEvents() {
        document.getElementById('lineTool').addEventListener('click', onToolClicked, false);
    }

    function hookupcanvasEvents() {
        var painting = false,
            lastPos = null,
            surface = null;

        function move(e) {
            if (painting) {
                var offsetX = 0;
                var w = Settings.brush.width;
                ctx.moveTo(lastPos.x + offsetX, lastPos.y);
                ctx.lineTo(e.x + offsetX, e.y);
                ctx.stroke();
            }
            lastPos = { x: e.x, y: e.y };
        }

        function up(e) {
            if (painting) {
                painting = false;
                ctx.closePath();

                // createUndoChange();
            }
        }

        function down(e) {
            painting = true;
            lastPos = { x: e.x, y: e.y };
            ctx.beginPath();
            if (erasing) {
                // This is the most simplistic of erasers possible! =)
                ctx.strokeStyle = 'rgba(255,255,255,1)';
                ctx.lineWidth = Settings.eraser.width;
            }
            else {
                ctx.strokeStyle = colorToStyle(Settings.brush.color);
                ctx.lineWidth = Settings.brush.width;
            }
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            surface = undoStack[undoStack.length - 1];
        }

        canvas = document.getElementById('xpaint');
        canvas.height = window.screen.height;
        canvas.width = window.screen.width;
        ctx = canvas.getContext('2d');

        if (window.canvas === undefined)
            window.canvas = canvas;

        window.canvas.ctx = ctx;

        canvas.addEventListener('MSPointerDown', down, false);
        canvas.addEventListener('MSPointerMove', move, false);
        canvas.addEventListener('MSPointerUp', up, false);

        document.getElementById('appbar').addEventListener('MSPointerMove', up, false);
    }

    function onload(elements, state) {
        hookupAppbarEvents();
        hookupcanvasEvents();

        if (state) {
            imageIndex = state.imageIndex;
            var img = document.createElement('img');
            img.src = state.data;
            ctx.drawImage(img, 0, 0);
        }
        else {
            imageIndex = null;
        }

        undoStack = [];
        redoStack = [];

    }

    function colorToStyle(c) {
        return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + (c.a / 100) + ')';
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
        drawImage: drawImage,
        width: function () { return canvas.width; },
        height: function () { return canvas.height; }
    });
})();