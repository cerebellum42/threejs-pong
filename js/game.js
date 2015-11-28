define(['game-object', 'ball', 'play-area'], function (GameObject, Ball, PlayArea) {
    'use strict';

    var Game = GameObject.extend({
        create: function () {
            GameObject.prototype.create.apply(this, arguments);

            this.width = 1200;
            this.height = 600;
            this.gameCanvas = document.getElementById('game-canvas');
            this.fieldOfView = 60;
        },
        start: function () {
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(this.width, this.height);
            this.gameCanvas.appendChild(this.renderer.domElement);

            this.scene = new THREE.Scene();

            this.addCamera();
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
        addCamera: function () {
            this.camera = new THREE.PerspectiveCamera(
                this.fieldOfView,
                this.width / this.height,
                0.1,
                5000
            );
            this.camera.position.z = 250;
            this.scene.add(this.camera);
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
            GameObject.prototype.update.apply(this, arguments);
            this.renderer.render(this.scene, this.camera);
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
