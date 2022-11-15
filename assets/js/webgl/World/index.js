import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// import Materials from './Materials';
// import Controls from './Controls';
// import Torus from "./Torus";
// import Plane from "./Plane";
// import Fox from "./Fox";
// import Transition from "./Transition";


// import modal from "/assets/model/rouen.gltf";

export default class World {
  constructor(_option) {
    // this.time = _option.time;
    // this.sizes = _option.sizes;
    // this.debug = _option.debug;
    // this.light = _option.light;
    // this.camera = _option.camera;
    // this.renderer = _option.renderer;
    // this.resources = _option.resources;

    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder("world");
      this.debugFolder.open();
    }

    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;

    // this.setStartingScreen();

    this.start();
  }

  setStartingScreen() {
    this.resources.on("progess", (percent) =>
      console.log(`progress ${percent}/100`)
    );
    this.resources.on("ready", () => this.start());

    const { loaded, toLoad } = this.resources.loader;
    if (loaded === toLoad) this.start();
  }

  async start() {
    // this.setControls();
    // this.setMaterial();

    // await this.transition.firstTransition();

    const gltfloader = new GLTFLoader();
    const gltf = await gltfloader.loadAsync("/model/rouen.gltf");

    this.container.add(gltf.scene);
  }

  setControls() {
    this.controls = new Controls({
      time: this.time,
      sizes: this.sizes,
    });
  }

  setMaterial() {
    this.material = new Materials({
      resources: this.resources,
    });
  }
}
