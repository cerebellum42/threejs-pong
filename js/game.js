define(['behaviour', 'ball', 'play-area', 'rotatable-camera', 'paddle'], function (Behaviour, Ball, PlayArea, RotatableCamera, Paddle) {
    'use strict';

    var Game = Behaviour.extend({
        create: function () {
            Behaviour.prototype.create.apply(this, arguments);

            this.canvasWrapper = document.getElementById('game-canvas');
        },
        start: function () {
            // TODO: Three js renderer erstellen und der Seite hinzufügen

            this.scene = new THREE.Scene();

            this.addLights();
            this.cameraScript = this.addChild(
                new RotatableCamera({
                    aspectRatio: this.width / this.height,
                    scene: this.scene,
                    renderer: this.renderer,
                    domElement: this.renderer.domElement
                })
            );

            var fieldWidth = 180;
            var fieldHeight = 250;
            var paddleSpeed = 10;

            var plane = this.addChild(
                new PlayArea({
                    scene: this.scene,
                    width: fieldWidth,
                    height: fieldHeight
                })
            );

            var paddle1 = this.addChild(
                new Paddle({
                    scene: this.scene,
                    domElement: window,
                    paddleWidth: 40,
                    basePosition: new THREE.Vector2(0, -125),
                    speed: paddleSpeed,
                    keys: {
                        left: 89, // y
                        right: 88 // x
                    }
                })
            );

            var paddle2 = this.addChild(
                new Paddle({
                    scene: this.scene,
                    domElement: window,
                    paddleWidth: 40,
                    basePosition: new THREE.Vector2(0, 125),
                    speed: paddleSpeed,
                    keys: {
                        left: 37, // left arrow
                        right: 39 // right arrow
                    }
                })
            );

            this.addChild(
                new Ball({
                    scene: this.scene,
                    bounds: {
                        x: [fieldWidth/(-2), fieldWidth/2],
                        y: [fieldHeight/(-2), fieldHeight/2]
                    },
                    paddles: [paddle1, paddle2]
                })
            );

            this.update(0);
        },
        /**
         * Add lights to the scene
         */
        addLights: function () {
            // TODO: zwei Lichter mit three js erstellen, um die Szene auszuleuchten
        },
        /**
         * Calls itself every frame through requestAnimationFrame and manages passing and calculating
         * the time delta to its child objects
         */
        update: function () {
            /**
             * TODO:
             * game loop implementieren
             * Zeit seit dem letzten Aufruf berechnen (delta)
             * update(delta) der übergeordneten Klasse (Behaviour) aufrufen
             */
        }
    });

    return {
        Game: Game,
        init: function () {
            var g = new Game();
            g.start();
        }
    }
});
