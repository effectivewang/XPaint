(function () {

    XPaint = XPaint || {};

    XPaint.ShapeType = {
        none    : 0,
        rect    : 1,
        ellipse : 2,
        polygon : 3,
        star    : 4
    };

    XPaint.ShapeTool = function () {
        var borderColor, borderSize, color = color, shapeType;

        this.view = "/html/palettes/shape.html";

        this.onmousedown = function (e) {
            this._isMouseDown = true;

            this._startX = e.pageX;
            this._startY = e.pageY;
        }

        this.onmouseup = function (e) {
            this._isMouseDown = false;

            var x = e.pageX;
            var y = e.pageY;

            var context = this._context;

            context.moveTo(this._startX, this._startY);
            context.lineTo(x, y);
            context.stroke();
        }

        this.prototype = XPaint.Tool.prototype;
        this.prototype.base = XPaint.Tool;
        this.constructor = XPaint.ShapeTool;
    }

})();