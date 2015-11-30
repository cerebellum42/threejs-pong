define(['behaviour', 'lib/OrbitControls'], function (Behaviour, OrbitControls) {
    var RotatableCamera = Behaviour.extend({
        create: function (options) {
            Behaviour.prototype.create.apply(this, arguments);
            this.options = Object.assign({}, RotatableCamera.defaultOptions, options);
            this.controls = null;
        },
        /**
         * Initializes the camera
         */
        start: function () {
            this.camera = new THREE.PerspectiveCamera(
                this.options.fieldOfView,
                this.options.aspectRatio,
                0.1,
                5000
            );
            this.camera.position.z = this.options.distance;
            this.camera.position.y = -this.options.distance/2;
            this.options.scene.add(this.camera);

            // make camerable movable with mouse controls
            var controls = new THREE.OrbitControls( this.camera, this.options.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = .5;
            controls.enableKeys = false;
            controls.enableZoom = true;
            this.controls = controls;
        }
    }).static({
        defaultOptions: {
            aspectRatio: null,
            fieldOfView: 60,
            distance: 250,
            scene: null,
            renderer: null,
            domElement: null
        }
    });
    return RotatableCamera;
});