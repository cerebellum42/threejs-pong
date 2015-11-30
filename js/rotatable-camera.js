define(['behaviour', 'lib/OrbitControls'], function (Behaviour, OrbitControls) {
    return Behaviour.extend({
        create: function (options) {
            Behaviour.prototype.create.apply(this, arguments);
            this.options = options;
            this.controls = null;
        },
        start: function () {
            this.camera = new THREE.PerspectiveCamera(
                this.options.fieldOfView,
                this.options.aspectRatio,
                0.1,
                5000
            );
            this.camera.position.z = this.options.distance;
            this.options.scene.add(this.camera);

            var controls = new THREE.OrbitControls( this.camera, this.options.domElement );
            controls.enableDamping = true;
            controls.dampingFactor = .5;
            controls.enableKeys = false;
            controls.enableZoom = true;
            this.controls = controls;
        }
    });
});