define(['behaviour'], function (Behaviour) {
    var PlayArea = Behaviour.extend({
        create: function (options) {
            Behaviour.prototype.create.apply(this, arguments);
            this.options = Object.assign({}, PlayArea.defaultOptions, options);
        },
        start: function () {
            // TODO: Plane-Mesh erstellen und der Szene hinzufügen
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
