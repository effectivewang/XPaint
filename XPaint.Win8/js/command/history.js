(function () {
    
    XPaint = XPaint || {};

    XPaint.history = function () {
        var undostack = [];
        var redostack = [];

        function redo() {
            if (redostack.length < 1) return;
        }

        function undo() {
            if (undostack.length < 1) return;
        }
    
        WinJS.Application.addEventListener('commandExecuted', function handler(cmd) {
            if (cmd != undefined) {
                undostack.push(cmd);
            }
        });
    }
})();