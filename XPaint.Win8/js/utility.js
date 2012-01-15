
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


    function getCircle(lastPos, curPos) {
        var x = (lastPos.x + curPos.x) / 2;
        var y = (lastPos.y + curPos.y) / 2;

        var radius = getDistance(lastPos, curPos) / 2;

        return {
            x: x,
            y: y,
            r: radius,
            sAngle: 0,
            eAngle: Math.PI * 2,
            antiLockWise: true
        };
    }

    function getDistance(pos, pos2) {
        var distance = Math.sqrt(
            Math.pow(pos.x - pos2.x, 2) +
            Math.pow(pos.y - pos2.y, 2));

        return distance;
    }

    function getPolygon(lastPos, curPos) {

    }

    function getStar(lastPos, curPos) {

    }

    function abs(value) {
        return Math.abs(value);
    }

    WinJS.Namespace.define("Utility", {
        colorToStyle: colorToStyle,
        getRect: getRect,
        getCircle: getCircle,
        abs: abs
    });

})();