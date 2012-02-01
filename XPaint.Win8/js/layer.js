(function layer(canvas) {


    function create(container, zIndex) {
        var c = document.createElement("canvas");
        c.className = "layer";
        c.style.zIndex = zIndex;
        c.width = container.width;
        c.height = container.height;

        c.id  = "canvas_" + zIndex;
        container.appendChild(c);
        
        return {
            canvas: c,
            context: c.getContext("2d"),
            width: c.width,
            height: c.height,
            hide: function () {
                this.canvas.style.visibility = "hidden";
            },
            show: function () {
                this.canvas.style.visibility = "visible";
            },
            transparent: function() {
                this.canvas.style.background = "none";
            },
            clear: function () {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }

        };
    }

    WinJS.Namespace.define("layer", {
        create: create
    });

})();

(function () {

    var layers;
    function createLayers(container) {
        this.operationLayer = layer.create(container, 3);
        this.paintingLayer = layer.create(container, 2);

        this.operationLayer.transparent();
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
