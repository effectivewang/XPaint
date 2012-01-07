(function layer(canvas) {

    var canvas;
    var ctx;

    function create(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        return {
            canvas: this.canvas,
            context: this.context,
            width: this.canvas.width,
            height: this.canvas.height
        };
    }

    WinJS.Namespace.define("layer", {
        create: create
    });

})();

(function () {

    function createLayers(canvas){
        this.operationLayer = layer.create(canvas);
        this.paintingLayer = layer.create(canvas);
    }

    function getPainting() {
        return this.paintingLayer;
    }

    function getOperation() {
        return this.operationLayer;
    }

    WinJS.Namespace.define("layerManager", {
        createLayers: createLayers,
        getDefault: getPainting
    });

})();
