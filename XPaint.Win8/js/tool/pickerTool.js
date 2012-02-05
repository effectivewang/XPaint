(function () {

    XPaint = XPaint || {};

    XPaint.PickerTool = function (penSize) {
        this._penSize = penSize;

        this.view = "/html/palettes/picker.html";

        var context = layerManager.getDefault().context;
        var lastPos;
        var width = 15;

        this.down = function (e) {
            this.setStyle();

            lastPos = { x: e.x, y: e.y };
        }

        this.up = function (e) {
            this._isMouseDown = false;

        }

        this.move = function (e) {
            var offsetX = 0;

            lastPos = { x: e.x, y: e.y };
        }

        this.prototype = XPaint.Tool.prototype;
        this.prototype.base = XPaint.Tool;
        this.constructor = XPaint.PickerTool;
    }

})();
        }

        this.prototype = XPaint.Tool.prototype;
        this.prototype.base = XPaint.Tool;
        this.constructor = XPaint.PickerTool;
    }

})();