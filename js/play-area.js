define([], function () {
  var PlayArea = GameObject.extend(function() {
    create: function(game) {
      GameObject.prototype.create.apply(this, arguments);
      this.game = game;
    },
    start: function() {
      // create the plane's material
      var planeMaterial =
      new THREE.MeshLambertMaterial(
      {
          color: 0x4BD121
      });

      // create the playing surface plane
      var plane = new THREE.Mesh(
          new THREE.PlaneGeometry(
          planeWidth * 0.95,	// 95% of table width, since we want to show where the ball goes out-of-bounds
          planeHeight,
          planeQuality,
          planeQuality),
          planeMaterial);

      scene.add(plane);
    }
  });
})
