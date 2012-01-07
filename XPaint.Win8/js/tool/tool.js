(function () {

    XPaint = XPaint || {};

    XPaint.Tool = function () {
        this.down = function (e) { }
        this.move = function (e) { }
        this.up = function (e) { }

        // virtual drawing method
        this.draw = function (context) {}

        this.active = function () { }
        this.deactive = function () { }
    }
})();

