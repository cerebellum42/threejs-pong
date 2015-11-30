define(['behaviour'], function (Behaviour) {
    var Ball = Behaviour.extend({
        create: function (options) {
            Behaviour.prototype.create.apply(this, arguments);
            this.options = Object.assign({}, Ball.defaultOptions, options);
            this.direction = new THREE.Vector2(0, 0);

            // calculate the bounds in which the ball is allowed to move, used for wall collision detection
            this.bounds = this.options.bounds;

            // add/subtract Ball size from the given bounds since the mesh position refers to the center of the mesh
            this.bounds.x[0] += this.options.size;
            this.bounds.x[1] -= this.options.size;
            this.bounds.y[0] += this.options.size;
            this.bounds.y[1] -= this.options.size;

            this.paddles = [];
            if (this.options.paddles) this.paddles = this.options.paddles;
        },
        /**
         * Initialize Geometry and material
         */
        start: function () {
            var sphereMaterial = new THREE.MeshLambertMaterial({
                color: 0xD43001
            });

            this.mesh = new THREE.Mesh(
                new THREE.SphereGeometry(this.options.size, 16, 16),
                sphereMaterial
            );

            this.reset(1);
            this.mesh.position.z = this.options.size;
            this.options.scene.add(this.mesh);
        },
        /**
         * Reset the ball's position and velocity to origin and start moving again after a set delay
         * @param dir -1 or 1, depending on which direction the ball is supposed to move after resetting (up or down)
         */
        reset: function(dir) {
            this.direction.set(0, 0);
            setTimeout((function() {
                if (dir > 0) {
                    this.direction.set(0, this.options.speed);
                }
                else {
                    this.direction.set(0, -this.options.speed);
                }
            }).bind(this), 2000);
            this.mesh.position.x = 0;
            this.mesh.position.y = 0;
        },
        update: function(delta) {
            if (this.mesh.position.x < this.bounds.x[0] ||
                this.mesh.position.x > this.bounds.x[1]) {
                this.direction.x = -this.direction.x;
            } else if (this.mesh.position.y < this.bounds.y[0]) {
                var hitPos = this.findPaddleHitPosition(this.paddles[0]);
                if (hitPos !== null) {
                    this.direction.y = -this.direction.y;
                    this.direction.x += hitPos * this.options.slice;
                }
                else {
                    this.reset(1);
                }
            } else if (this.mesh.position.y > this.bounds.y[1]) {
                var hitPos = this.findPaddleHitPosition(this.paddles[1]);
                if (hitPos !== null) {
                    this.direction.y = -this.direction.y;
                    this.direction.x += hitPos * this.options.slice;
                }
                else {
                    this.reset(-1);
                }
            }
            this.mesh.position.x += delta * 10 * this.direction.x;
            this.mesh.position.y += delta * 10 * this.direction.y;
        },
        findPaddleHitPosition: function(paddle) {
            var paddleBounds = paddle.getHorizontalBounds();
            if (this.mesh.position.x >= paddleBounds[0] && this.mesh.position.x <= paddleBounds[1]) {
                var halfPaddleWidth = paddle.options.paddleWidth/2;
                return ((this.mesh.position.x - paddleBounds[0]) - halfPaddleWidth) / halfPaddleWidth;
            } else {
                return null;
            }
        }
    }).static({
        defaultOptions: {
            scene: null,
            size: 7,
            speed: 10,
            bounds: null,
            paddles: [],
            slice: 5
        }
    });
    return Ball;
});
