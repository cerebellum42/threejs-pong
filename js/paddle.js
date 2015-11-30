define(['behaviour'], function(Behaviour) {
    var State = {
        DEFAULT: 1,
        MOVE_LEFT: 2,
        MOVE_RIGHT: 3
    };
    var Paddle = Behaviour.extend({
        create: function(options) {
            Behaviour.prototype.create.apply(this, arguments);
            this.options = Object.assign({}, Paddle.defaultOptions, options);
            this.state = State.DEFAULT;
        },
        start: function() {
            // TODO: Paddle-Mesh erstellen und positionieren (options-hash verwenden!), keyUp & keyDown events registrieren
        },
        onKeyDown: function(e) {
            // TODO: this.state setzen, wenn die Link- und Rechts-Tasten gedrückt werden
        },
        onKeyUp: function(e) {
            // TODO: this.state zurücksetzen, wenn die Tasten losgelassen werden
        },
        update: function(delta) {
            // TODO: Position des Meshes animieren, wenn das Paddel bewegt wird
        }
    }).static({
        defaultOptions: {
            scene: null,
            domElement: null,
            paddleWidth: 40,
            basePosition: new THREE.Vector2(0, 0),
            speed: 10,
            keys: {
                left: 89, // y
                right: 88 // x
            }
        }
    });
    return Paddle;
});