(function () {

    XPaint = XPaint || {};

    XPaint.history = function () {
        var commands = [];
        var index = 0;

        this.redo = function() {
            if (!this.canRedo()) return;

            commands[index++].execute();
        }

        this.undo = function() {
            if (!this.canUndo()) return;

            commands[index--].unexecute();
        }

        this.canUndo = function() {
            return commands.length > 0;
        }

        this.canRedo = function() {
            return index < commands.length - 1;
        }

        this.queue = function (cmd) {
            commands.push(cmd);
            index = commands.length - 1;
        }
    }

})();