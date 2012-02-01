(function () {

    XPaint = XPaint || {};

    XPaint.CropTool = function () {

        var layer = layerManager.getOperation();
        var context = layer.context;
        var lastPos;
        var width = 2;

        this.setStyle = function () {
            context.fillStyle = 'black';
            context.lineWidth = width;
        }

        this.active = function () {
            this.setStyle();
            context.globalAlpha = 0.8;
        }

        this.deactive = function () {
            layer.clear();
            context.globalAlpha = 1.0;
        }

        this.down = function (e) {
            this._isMouseDown = true;

            lastPos = { x: e.x, y: e.y };
        }

        this.up = function (e) {
            if (this._isMouseDown == false) return;
            if (lastPos.x == e.x && lastPos.y == e.y) return;

            this._isMouseDown = false;

            context.beginPath();

            var r = Utility.getRect(lastPos, e);

            // top side
            context.rect(0, 0, layer.width, r.y);
            // down side
            context.rect(0, r.y + r.height, layer.width, layer.height - (r.y + r.height));
            // left side
            context.rect(0, r.y, r.x, r.y + r.height);
            // right side
            context.rect(r.x + r.width, r.y, (layer.width - (r.width + r.x)), r.height);

            context.closePath();
            context.fill();

            this.drawCrop(r);
        }

        this.move = function (e) {
            var offsetX = 0;

            layerManager.getOperation().clear();
            context.beginPath();

            var r = Utility.getRect(lastPos, e);

            /*
                Crop Region = (Top side + Left side + Right side + Down side)
                ---------------------
                ------       --------
                ------       --------
                ---------------------
            */

            // top side
            context.rect(0, 0, layer.width, r.y);
            // down side
            context.rect(0, r.y + r.height, layer.width, layer.height - (r.y + r.height));
            // left side
            context.rect(0, r.y, r.x, r.y + r.height);
            // right side
            context.rect(r.x + r.width, r.y, (layer.width - (r.width + r.x)), r.height);

            context.closePath();
            context.fill();

        }

        this.drawCrop = function (rect) {
            var cW = 50;
            var cH = 20;

            var r = {
                x: rect.x + rect.width - cW,
                y: rect.y,
                w: cW,
                h: cH
            };

            context.rect(r.x, r.y, r.w, r.h);
            context.fill();

            context.fillStyle = 'red';
            context.fillText("Save", r.x, r.y + cH);
            
            context.fillStyle = 'black';
        }

        this.prototype = XPaint.Tool.prototype;
        this.prototype.base = XPaint.Tool;
        this.constructor = XPaint.CropTool;
    }

})();