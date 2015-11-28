define(['lib/jsclass'], function(JSClass) {
  var GameObject = new JSClass({
    create: function() {
      this.children = [];
      this.parent = null;
    },
    start: function() {},
    update: function() {
      this.children.forEach(function(child) {
        child.update();
      });
    },
    fixedUpdate: function() {
      this.children.forEach(function(child) {
        child.fixedUpdate();
      });
    },
    addChild: function(go) {
      go.parent = this;
      go.start();
      this.children.push(go);
    }
  });

  return GameObject;
});
