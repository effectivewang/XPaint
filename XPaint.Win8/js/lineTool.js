
function lineTool(penSize, color) {
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
}

lineTool.prototype = tool.prototype;
lineTool.prototype.base = tool;
lineTool.constructor = lineTool;

lineTool.prototype.draw = function (context) {
    context.lineWidth = this._penSize;
    context.strokeStyle = this._color;
    this._context = context;
}

lineTool.prototype.onmousemove = function (e) {
    if (!this._isMouseDown) return;


}