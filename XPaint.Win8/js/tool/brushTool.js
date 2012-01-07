(function () {

    XPaint = XPaint || {};

    XPaint.BrushTool = function (penSize, color) {
        this._penSize = penSize;
        this._color = color;

        this.view = "/html/palettes/size.html";

        var context = layerManager.getDefault().context;
        var lastPos;

        this.setStyle = function () {
            context.strokeStyle = Utility.colorToStyle(Settings.brush.color);
            context.lineWidth = Settings.brush.width;
            context.lineCap = 'round';
            context.lineJoin = 'round';
        }

        this.down = function (e) {
            context.beginPath();
            this.setStyle();

            lastPos = { x: e.x, y: e.y };
        }

        this.up = function (e) {
            this._isMouseDown = false;

            var x = e.pageX;
            var y = e.pageY;

            context.closePath();
        }

        this.move = function (e) {
            var offsetX = 0;
            var w = Settings.brush.width;
            context.moveTo(lastPos.x + offsetX, lastPos.y);
            context.lineTo(e.x + offsetX, e.y);
            context.stroke();

            lastPos = { x: e.x, y: e.y };
        }

        this.prototype = XPaint.Tool.prototype;
        this.prototype.base = XPaint.Tool;
        this.constructor = XPaint.BrushTool;
    }

})();