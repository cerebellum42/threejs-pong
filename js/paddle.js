define(['behaviour'], function(Behaviour) {
    var STATES = {
        DEFAULT: 1,
        MOVE_LEFT: 2,
        MOVE_RIGHT: 3
    };
    return Behaviour.extend({
        create: function(options) {
            Behaviour.prototype.create.apply(this, arguments);
            this.options = options;
        },
        start: function() {
            var material = new THREE.MeshLambertMaterial({
                color: 0xD43001
            });

            var paddleMesh = new THREE.Mesh(
                new THREE.BoxGeometry(this.options.paddleWidth, 5, 10, 1, 1, 1),
                material
            );
            paddleMesh.position.x = this.options.basePosition.x;
            paddleMesh.position.y = this.options.basePosition.y;
            paddleMesh.position.z = 5;
            this.options.scene.add(paddleMesh);

            this.options.domElement.addEventListener('keydown', this.onKeyDown.bind(this));
            this.options.domElement.addEventListener('keyup', this.onKeyUp.bind(this));
        },
        onKeyDown: function(e) {
            if (e.keyCode == this.options.keys.left) {
                this.state = STATES.MOVE_RIGHT;
            } else if (e.keyCode == this.options.keys.right) {
                this.state = STATES.MOVE_LEFT;
            }
        },
        onKeyUp: function(e) {
            if (e.keyCode == this.options.keys.left || e.keyCode == this.options.keys.right) {
                this.state = STATES.DEFAULT;
            }
        },
        update: function(e) {
        }
    });
});