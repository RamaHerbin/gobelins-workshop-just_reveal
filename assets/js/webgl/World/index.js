import * as THREE from "three";

import Globe from "./Globe";
import Skybox from "./Skybox.js";

export default class World {
  constructor(_option) {
    this.scene = _option.scene;
    this.renderer = _option.renderer;
    this.camera = _option.camera;
    this.$canvas = _option.$canvas;
    this.time = _option.time;
    this.sizes = _option.sizes;

    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;

    this.setupGlobe();
    this.setupSkyBox();
    this.setupLights();
    this.setupBg();
    this.setupSkyBox();
  }

  setupGlobe() {
    this.globe = new Globe({
      scene: this.scene,
      renderer: this.renderer,
      camera: this.camera,
      $canvas: this.$canvas,
      sizes: this.sizes,
    });

    this.scene.instance.add(this.globe.container);
  }

  setupSkyBox() {
    this.skybox = new Skybox({
      scene: this.scene,
      renderer: this.renderer,
      camera: this.camera,
    });
  }

  setupBg() {
    this.renderer.instance.setClearColor(0x040b4a);
  }

  setupLights() {
    // const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.5 );
    // this.scene.instance.add( ambientLight );

    const firstLight = new THREE.DirectionalLight(0x00043d, 0.4);
    this.scene.instance.add(firstLight);
    firstLight.position.x = -4;
    firstLight.position.y = 16;
    firstLight.position.z = -10;
    firstLight.castShadow = true;

    const secondLight = new THREE.DirectionalLight(0x308d98, 0.4);
    this.scene.instance.add(secondLight);
    secondLight.position.x = -6;
    secondLight.position.y = 12;
    secondLight.position.z = 15;
    secondLight.castShadow = true;

    const frontLight = new THREE.DirectionalLight(0xffee4d, 0.5);
    this.scene.instance.add(frontLight);
    frontLight.position.x = -5;
    frontLight.position.y = 18;
    frontLight.position.z = 0;
    frontLight.castShadow = true;
  }
}
