define(['behaviour', 'lib/jsclass'], function (Behaviour, JSClass) {
    var Ball = Behaviour.extend({
        create: function (options) {
            Behaviour.prototype.create.apply(this, arguments);
            this.options = options;
        },
        start: function () {
            var sphereMaterial = new THREE.MeshLambertMaterial({
                color: 0xD43001
            });

            var ball = new THREE.Mesh(
                new THREE.SphereGeometry(this.options.size, 16, 16),
                sphereMaterial
            );

            ball.position.z = this.options.size;

            this.options.scene.add(ball);
        }
    });
    return Ball;
});
