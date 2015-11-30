define(['behaviour'], function (Behaviour) {
    var PlayArea = Behaviour.extend({
        create: function (options) {
            Behaviour.prototype.create.apply(this, arguments);
            this.options = Object.assign({}, PlayArea.defaultOptions, options);
        },
        start: function () {
            var material = new THREE.MeshLambertMaterial({
                color: 0x111111
            });

            // create the playing surface plane
            this.mesh = new THREE.Mesh(
                new THREE.PlaneGeometry(
                    this.options.width,	// 95% of table width, since we want to show where the ball goes out-of-bounds
                    this.options.height,
                    1, 1),
                material
            );

            this.options.scene.add(this.mesh);
        }
    }).static({
        defaultOptions: {
            scene: null,
            width: null,
            height: null
        }
    });

    return PlayArea;
});
