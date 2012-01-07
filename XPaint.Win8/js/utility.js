
(function () {

    function colorToStyle(c) {
        return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + (c.a / 100) + ')';
    }

    WinJS.Namespace.define("Utility", {
        colorToStyle: colorToStyle
    });

})();