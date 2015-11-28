define([], function () {
    var PlayArea = GameObject.extend({
        create: function (options) {
            GameObject.prototype.create.apply(this, arguments);
            this.options = options;
        },
        start: function () {
            // create the plane's material
            var planeMaterial =
                new THREE.MeshLambertMaterial(
                    {
                        color: 0x4BD121
                    });

            // create the playing surface plane
            var plane = new THREE.Mesh(
                new THREE.PlaneGeometry(
                    this.options.planeWidth * 0.95,	// 95% of table width, since we want to show where the ball goes out-of-bounds
                    this.options.planeHeight,
                    this.options.planeQuality,
                    this.options.planeQuality),
                this.options.planeMaterial);

            scene.add(plane);
        }
    });

    return PlayArea;
});
