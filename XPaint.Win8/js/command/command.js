(function () {

    XPaint = XPaint || {};

    XPaint.command = function () {
        var state = null;
        
        function getState() {
            var layer = layerManager.getDefault();

            return layer.context.getImageData(0, 0, layer.width, layer.height);
        }

        var oldState = getState();

        this.execute = function() {
            state = getState();
        }

        this.unexecute = function() {
            var layer = layerManager.getDefault();
            layer.context.putImageData(oldState, 0, 0);
        }
    }
})();