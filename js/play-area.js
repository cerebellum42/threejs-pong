define(['game-object'], function (GameObject) {
    var PlayArea = GameObject.extend({
        create: function (options) {
            GameObject.prototype.create.apply(this, arguments);
            this.options = options;
        },
        start: function () {
            var material = new THREE.MeshLambertMaterial({
                color: 0x111111
            });

            // create the playing surface plane
            var plane = new THREE.Mesh(
                new THREE.PlaneGeometry(
                    this.options.width * 0.95,	// 95% of table width, since we want to show where the ball goes out-of-bounds
                    this.options.height,
                    1, 1),
                material
            );

            this.options.scene.add(plane);
        }
    });

    return PlayArea;
});
