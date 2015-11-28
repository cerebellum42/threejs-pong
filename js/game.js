define(['behaviour', 'ball', 'play-area', 'rotatable-camera'], function (Behaviour, Ball, PlayArea, RotatableCamera) {
    'use strict';

    var Game = Behaviour.extend({
        create: function () {
            Behaviour.prototype.create.apply(this, arguments);

            this.width = 1200;
            this.height = 600;
            this.canvasWrapper = document.getElementById('game-canvas');
        },
        start: function () {
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(this.width, this.height);
            this.canvasWrapper.appendChild(this.renderer.domElement);

            this.scene = new THREE.Scene();

            this.cameraScript = this.addChild(
                new RotatableCamera({
                    aspectRatio: this.width / this.height,
                    fieldOfView: 60,
                    distance: 250,
                    scene: this.scene,
                    renderer: this.renderer,
                    domElement: this.renderer.domElement
                })
            );

            this.addLight();

            this.addChild(
                new Ball({
                    scene: this.scene,
                    size: 7
                })
            );

            this.addChild(
                new PlayArea({
                    scene: this.scene,
                    width: 180,
                    height: 250
                })
            );

            this.update();
        },
        addLight: function () {
            var pointLight = new THREE.PointLight(0xF8D898);
            pointLight.position.x = -1000;
            pointLight.position.y = 0;
            pointLight.position.z = 1000;
            pointLight.intensity = 3;
            pointLight.distance = 10000;
            this.scene.add(pointLight);
        },
        update: function () {
            Behaviour.prototype.update.apply(this, arguments);
            this.renderer.render(this.scene, this.cameraScript.camera);
            requestAnimationFrame(this.update.bind(this));
        }
    });

    return {
        game: Game,
        init: function () {
            var g = new Game();
            g.start();
        }
    }
});
