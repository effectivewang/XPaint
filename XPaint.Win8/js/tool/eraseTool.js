(function () {

    XPaint = XPaint || {};

    XPaint.EraseTool = function (penSize) {
        this._penSize = penSize;

        this.view = "/html/palettes/erasersize.html";

        var context = layerManager.getDefault().context;
        var lastPos;
        var width = 15;

        this.setStyle = function () {
            context.strokeStyle = Utility.colorToStyle(Settings.brush.color);
            context.lineWidth = Settings.brush.width;
            width = Settings.brush.width;
            context.lineCap = 'round';
            context.lineJoin = 'round';
        }

        this.active = function () {
            XPaint.setCursor("crosshair");
        }

        this.deactive = function () {
            XPaint.setCursor("default");
        }

        this.down = function (e) {
            this.setStyle();

            lastPos = { x: e.x, y: e.y };
        }

        this.up = function (e) {
            this._isMouseDown = false;

        }

        this.move = function (e) {
            var offsetX = 0;

            var r = Utility.getRect(lastPos, e);
            r.x -= width / 2;
            r.y -= width / 2;
            r.width = width;
            r.height = width;

            context.clearRect(r.x, r.y, r.width, r.height);

            lastPos = { x: e.x, y: e.y };
        }

        this.prototype = XPaint.Tool.prototype;
        this.prototype.base = XPaint.Tool;
        this.constructor = XPaint.BrushTool;
    }

})();