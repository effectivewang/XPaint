(function layer(canvas) {

    var canvas;
    var ctx;

    function create(canvas, zIndex) {
        var c = document.createElement("canvas");
        c.className = "layer";
        c.style.zIndex = zIndex;

        this.canvas = c;
        this.context = c.getContext("2d");

        return this;
    }

    function clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    WinJS.Namespace.define("layer", {
        create: create,
        clear: clear
    });

})();

(function () {

    var layers;
    function createLayers(canvas) {
        this.operationLayer = layer.create(canvas, 1);
        this.paintingLayer = layer.create(canvas, 0);

        layers = [this.operationLayer, this.paintingLayer];
        return layers;
    }

    function getPainting() {
        return this.paintingLayer;
    }

    function getOperation() {
        return this.operationLayer;
    }

    function setStyle(style) {
        for (l in layers) {
            var item = layers[l];

            for (v in style) {
                item.context.v = style[v];
            }
        }
    }

    WinJS.Namespace.define("layerManager", {
        createLayers: createLayers,
        getDefault: getPainting,
        getOperation: getOperation,
        setStyle: setStyle
    });

})();
