var hash_map = {

    get: function (key) {
        return this[key]
    },

    set: function (key, value) {
        this[key] = value
    },

    contains: function (key) {
        return this[key] == null ? true : false
    },

    remove: function (key) {
        delete this[key]
    }
}

function App(toolbox, canvas) {

    this._tools = new Array();

    this._toolbox = toolbox;
    this._canvas = canvas;

    this.tool_map = [
        ["lineTool", "images/tools/Brush_2.png"],
        ["fillTool", "images/tools/Fill_2.png"],
        ["cropTool", "images/tools/Crop_2.png"],
        ["eraserTool", "images/tools/Eraser_2.png"],
        ["pickerTool", "images/tools/Picker_2.png"],
        ["ellipseTool", "images/tools/Shape_ellipses_2.png"],
        ["burstTool", "images/tools/Shape_burst_2.png"],
        ["gearTool", "images/tools/Shape_gear_2.png"],
        ["polygonTool", "images/tools/Shape_polygon_2.png"],
        ["starTool", "images/tools/Shape_star_2.png"],
        ["stampTool", "images/tools/Stamp_2.png"],
        ["textTool", "images/tools/Text_2.png"],
        ["selectTool", "images/tools/Marquee_ellipses_2.png"]
    ];

    var context = this._canvas.getContext("2d");
    this._curTool = new lineTool(5, "#FA0000");
    this._curTool.draw(context);
};

App.prototype.loadControls = function () {

    for (i = 0; i < this.tool_map.length; i++) {
        //var item = this.tool_map[i];
        var toolName = item[0];
        var iconFile = item[1];

        //var tool = eval("new " + toolName + "()");
        //this._tools.push(tool);

        this._toolbox.append("<img id='" + toolName + "' src='" + iconFile + "' />");
    }

    // this._toolbox.dialog('open');

}

App.prototype.initEvents = function () {
    var tool = this._curTool;

    this._canvas.onmousedown = function (e) {
        tool.onmousedown(e);
    }
    this._canvas.onmousemove = function (e) {
        tool.onmousemove(e);
    }
    this._canvas.onmouseup = function (e) {
        tool.onmouseup(e);
    }
}

App.prototype.init = function () {

    this.loadControls();
    this.initEvents();
}


