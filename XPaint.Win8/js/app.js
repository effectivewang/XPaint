function App(toolbox, canvas) {

    this._tools = new Object();

    this._toolbox = toolbox;
    this._canvas = canvas;

    var context = this._canvas.getContext("2d");
    this._curTool = new lineTool(5, "#FA0000");
    this._curTool.draw(context);
};

App.prototype.loadControls = function () {

    var dialog = new Windows.UI.Popups.MessageDialog(this._toolbox);
    dialog.showAsync();

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


