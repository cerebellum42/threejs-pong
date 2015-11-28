define(['game-object', 'lib/jsclass'], function (GameObject, JSClass) {
    var Ball = GameObject.extend({
        create: function (game) {
            GameObject.prototype.create.apply(this, arguments);
            this.game = game;
        },
        start: function () {
            var sphereMaterial = new THREE.MeshLambertMaterial({
                color: 0xD43001
            });

            var ball = new THREE.Mesh(
                new THREE.SphereGeometry(10, 10, 10),
                sphereMaterial
            );

            this.game.scene.add(ball);
        }
    });
    return Ball;
});
