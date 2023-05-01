let scene,
  camera,
  renderer,
  cloudParticles = [];

function main() {
  const canvas = document.querySelector("canvas");
  renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 60;
  const aspect = window.innerWidth / window.innerHeight; // the canvas default
  const near = 0.1;
  const far = 1000;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 1;
  camera.rotation.x = 1.16;
  // camera.rotation.z = 0.27;

  scene = new THREE.Scene();

  const ambient = new THREE.AmbientLight(0x555555);
  scene.add(ambient);

  const directionalLight = new THREE.DirectionalLight(0xffeedd);
  directionalLight.position.set(0, 0, 1);
  scene.add(directionalLight);

  const flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
  flash.position.set(200, 300, 100);
  scene.add(flash);

  scene.fog = new THREE.FogExp2(0x11111f, 0.002);
  renderer.setClearColor(scene.fog.color);

  const rainGeo = new THREE.Geometry();
  for (let i = 0; i < 10000; i++) {
    const rainDrop = new THREE.Vector3(
      Math.random() * 400 - 200,
      Math.random() * 1000 - 250,
      Math.random() * 400 - 200
    );
    rainDrop.velocity = 0;
    rainGeo.vertices.push(rainDrop);
  }
  const rainMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.1,
    transparent: true,
  });
  const rain = new THREE.Points(rainGeo, rainMaterial);
  scene.add(rain);

  let loader = new THREE.TextureLoader();
  loader.load("../assets/smoke.png", function (texture) {
    const cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
    const cloudMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
    });
    for (let p = 0; p < 25; p++) {
      let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(
        Math.random() * 800 - 400,
        500,
        Math.random() * 500 - 450
      );
      cloud.rotation.x = 1.16;
      cloud.rotation.z = Math.random() * 360;
      cloud.material.opacity = 0.6;
      cloudParticles.push(cloud);
      scene.add(cloud);
    }

    requestAnimationFrame(render);
  });

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001; // конвертировать время в секунды

    cloudParticles.forEach((p) => {
      p.rotation.z -= 0.0002;
    });
    rainGeo.vertices.forEach((p) => {
      p.velocity -= 0.1 + Math.random() * 0.1;
      p.y += p.velocity;

      if (p.y < -200) {
        p.y = Math.random() * 1000 - 250;
        p.velocity = 0;
      }
    });

    rainGeo.verticesNeedUpdate = true;
    rain.rotation.y += 0.002;

    if (Math.random() > 0.93 || flash.power > 100) {
      if (flash.power < 100)
        flash.position.set(Math.random() * 400, 300 + Math.random() * 200, 100);
      flash.power = 50 + Math.random() * 500;
    }

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
}

main();
