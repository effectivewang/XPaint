(function () {
    'use strict';
    // Uncomment the following line to enable first chance exceptions.
    // Debug.enableFirstChanceException(true);


    WinJS.Application.onmainwindowactivated = function (e) {
        if (e.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.launch) {
            // TODO: startup code here
            var picker = new Windows.Storage.Pickers.FileOpenPicker();
            picker.pickSingleFileAsync();
        }
    }

    WinJS.Application.start();
})();