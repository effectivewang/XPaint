(function () {

    XPaint = XPaint || {};

    XPaint.lineTool = function (penSize, color) {
        this._penSize = penSize;
        this._color = color;
        
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

        this.prototype = XPaint.tool.prototype;
        this.prototype.base = XPaint.tool;
        this.constructor = XPaint.lineTool;

        this.prototype.draw = function (context) {
            context.lineWidth = this._penSize;
            context.strokeStyle = this._color;
            this._context = context;
        }

        this.prototype.onmousemove = function (e) {
            if (!this._isMouseDown) return;

        }
   }

})();