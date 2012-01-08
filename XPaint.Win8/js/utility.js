
(function () {

    function colorToStyle(c) {
        return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + (c.a / 100) + ')';
    }

    function getRect(lastPos, curPos) {
        var x = lastPos.x > curPos.x ? curPos.x : lastPos.x;
        var y = lastPos.y > curPos.y ? curPos.y : lastPos.y;

        var width = abs(lastPos.x - curPos.x);
        var height = abs(lastPos.y - curPos.y);

        return {
            x: x,
            y: y,
            width: width,
            height: height
        };
    }

    function abs(value) {
        return value < 0 ? 0 - value : value;
    }

    WinJS.Namespace.define("Utility", {
        colorToStyle: colorToStyle,
        getRect: getRect,
        abs: abs
    });

})();