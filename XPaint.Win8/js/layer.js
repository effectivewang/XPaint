(function layer(canvas) {

    function getCurrent() {
        return canvas;
    }

    WinJS.Namespace.define("layer", {
        current: getCurrent
    });
})();

(function layerManager() {

    function createLayers(canvas){
        this.backgroundLayer = new layer(canvas);
        this.operationLayer = new layer(canvas);
        this.paintingLayer = new layer(canvas);
    }

    function getCanvas() {
        return this.paintingLayer;
    }

    function getOperation() {
        return this.operationLayer;
    }

    WinJS.Namespace.defineWithParent(layer, "layerManager", {
        createLayers: createLayers,
        defaultLayer: getOperation
    });

})();
