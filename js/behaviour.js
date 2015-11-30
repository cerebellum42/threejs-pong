define(['lib/jsclass'], function (JSClass) {
    var Behaviour = new JSClass({
        create: function () {
            this.children = [];
            this.parent = null;
        },
        /**
         * Invoked when the object is added as a child to another Behaviour
         */
        start: function () {
        },
        /**
         * Update is designed to be called once er frame with the time that has passed
         * since the last frame. The actual calling has to be implemented in a root Behaviour.
         *
         * This implementation should be called from all overrides in child classes so that child Objects have their
         * update methods called as well.
         * @param delta time passed since last frame in seconds
         */
        update: function (delta) {
            this.children.forEach(function (child) {
                child.update(delta);
            });
        },
        /**
         * Adds a child Behaviour to this object. When it is added, the child object's
         * start() method is invoked and its parent attribute is set to this object.
         * @param child Behaviour
         * @returns the added child Behaviour
         */
        addChild: function (child) {
            child.parent = this;
            this.children.push(child);
            child.start();
            return child;
        }
    });

    return Behaviour;
});
