define(['game-object', 'ball'], function (GameObject, Ball) {
    'use strict';

    var Game = GameObject.extend({
        create: function () {
            GameObject.prototype.create.apply(this, arguments);

            this.width = 640;
            this.height = 360;
            this.gameCanvas = document.getElementById('game-canvas');
            this.fieldOfView = 60;
        },
        start: function () {
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(this.width, this.height);
            this.gameCanvas.appendChild(this.renderer.domElement);

            this.scene = new THREE.Scene();

            this.camera = new THREE.PerspectiveCamera(
                this.fieldOfView,
                this.width / this.height,
                0.1,
                5000
            );

            this.scene.add(this.camera);
            this.camera.position.z = 50;

            this.addChild(new Ball(this));

            var pointLight = new THREE.PointLight(0xF8D898);
            pointLight.position.x = -1000;
            pointLight.position.y = 0;
            pointLight.position.z = 1000;
            pointLight.intensity = 3;
            pointLight.distance = 10000;
            this.scene.add(pointLight);

            this.update();
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
