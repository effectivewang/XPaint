(function () {
    'use strict';
    // Uncomment the following line to enable first chance exceptions.
    Debug.enableFirstChanceException(true);

    var resourceLoader = null;

    function activated(e) {
        if (e.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.launch) {
            Windows.Graphics.Display.DisplayProperties.autoRotationPreferences = Windows.Graphics.Display.DisplayOrientations.landscape | Windows.Graphics.Display.DisplayOrientations.landscapeFlipped;

            resourceLoader = new Windows.ApplicationModel.Resources.ResourceLoader();
            //getPaintings()
            //    .then(function (paintings) {
            //    if (paintings.length === 0) {
            //        WinJS.Navigation.navigate('/html/xpaint.html');
            //    }
            //    else {
            //        WinJS.Navigation.navigate('/html/gallery.html', paintings);
            //    }
            //});
            WinJS.Navigation.navigate('/html/xpaint.html');
        }
    }

    function navigated(e) {
        var host = document.getElementById('contentHost');
        WinJS.UI.Fragments.clone(e.detail.location, e.detail.state)
            .then(function (frag) {
            host.innerHTML = '';
            host.appendChild(frag);
            document.body.focus();

            return WinJS.UI.processAll(host);
        })
            .then(function () {
            WinJS.Binding.processAll(host, window);
            return WinJS.Resources.processAll(host);
        })
            .then(function () {
            WinJS.Application.queueEvent({ type: 'fragmentappended', location: e.detail.location, fragment: host, state: e.detail.state });
        });
    }

    function saveImage() {

    }

    function getPaintings() {
        return WinJS.Application.local.readText('paintings', '[]')
            .then(function (p) { return JSON.parse(p); })
            .then(function (p) { return p; }, function () { return[]; });
    }

    WinJS.Application.addEventListener("activated", activated);
    WinJS.Navigation.addEventListener("navigated", navigated);
    WinJS.Application.start();

    WinJS.Namespace.define("App", {
        resource: function (key) { return resourceLoader.getString(key); },
        saveImage: saveImage,
        getPaintings: getPaintings
    });

    WinJS.Namespace.define('Settings', WinJS.Binding.as({
        brush: {
            width: 5,
            color: { r: 0, g: 200, b: 0, a: 100 }
        },
        eraser: {
            width: 5,
        }
    }));
})();

