(function () {

    XPaint = XPaint || {};

    XPaint.ShapeType = {
        none: 0,
        rect: 1,
        ellipse: 2,
        polygon: 3,
        star: 4
    };

    XPaint.ShapeData = [
    { title: "Rectangle", picture: "/assets/images/rect.png", text: "rect" },
    { title: "Ellipse", picture: "/assets/images/ellipse.png", text: "ellipse" },
    { title: "Polygon", picture: "/assets/images/polygon.png", text: "polygon" },
    { title: "Start", picture: "/assets/images/star.png", text: "star" }
    ];

    XPaint.ShapeTool = function () {
        var borderColor, borderSize, color = color, shapeType;

        this.view = "/html/palettes/shape.html";

        this.shapeType = XPaint.ShapeType.rect;

        var context = layerManager.getDefault().context;
        var opeartionLayer = layerManager.getOperation();
        var lastPos;

        this.setStyle = function () {
            layerManager.setStyle({
                strokeStyle: Utility.colorToStyle(Settings.brush.color),
                lineWidth: Settings.brush.width,
                lineCap: 'round',
                lineJoin: 'round'
            });
        }

        this.down = function (e) {
            context.beginPath();
            this.setStyle();

            lastPos = { x: e.x, y: e.y };
        }

        this.up = function (e) {
            this._isMouseDown = false;

            var r = Utility.getRect(lastPos, e);

            opeartionLayer.clear();

            switch (this.shapeType) {
                case XPaint.ShapeType.rect:
                    context.fillRect(r.x, r.y, r.width, r.height);
                    context.strokeRect(r.x, r.y, r.width, r.height);
                    break;
                case XPaint.ShapeType.ellipse:
                    context.ellipse(r.x, r.y, r.width, r.height);

                    context.fill();
                    break;
                default: break;
            }

            context.closePath();
        }

        this.move = function (e) {
            var offsetX = 0;

            var r = Utility.getRect(lastPos, e);

            opeartionLayer.clear();
            opeartionLayer.context.beginPath();

            switch (this.shapeType) {
                case XPaint.ShapeType.rect:
                    opeartionLayer.context.rect(r.x, r.y, r.width, r.height);
                    break;
                case XPaint.ShapeType.ellipse:                    
                    opeartionLayer.context.ellipse(r.x, r.y, r.width, r.height);
                    break;
                case XPaint.ShapeType.polygon:

                    break;
                case XPaint.ShapeType.star:

                    break;
            }

            opeartionLayer.context.closePath();
            opeartionLayer.context.stroke();
        }

        this.changeType = function (g, value, el, eventName) {

            el.addEventListener("change", function (evt) {
                var target = evt.currentTarget;
                XPaint.curTool.shapeType = parseInt(target.value);
            });
        }

        this.prototype = XPaint.Tool.prototype;
        this.prototype.base = XPaint.Tool;
        this.constructor = XPaint.BrushTool;
    }

})();