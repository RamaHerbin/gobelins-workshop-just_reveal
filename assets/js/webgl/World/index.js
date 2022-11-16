import * as THREE from "three";

import Globe from "./Globe";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Water } from "three/addons/objects/Water.js";


import { GUI } from "three/addons/libs/lil-gui.module.min.js";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { SAOPass } from "three/addons/postprocessing/SAOPass.js";
import Sky from "./Sky";

// import { PlaneMaterial } from "../Materials/AtmosphereMaterial.js";

// import fragmentShader from '/public/shaders/basic.frag';
// import vertexShader from '/public/shaders/basic.vert';

// import Materials from './Materials';
// import Controls from './Controls';
// import Torus from "./Torus";
// import Plane from "./Plane";
// import Fox from "./Fox";
// import Transition from "./Transition";

export default class World {
  constructor(_option) {
    // this.time = _option.time;
    // this.sizes = _option.sizes;
    // this.debug = _option.debug;
    // this.light = _option.light;
    // this.camera = _option.camera;
    // this.renderer = _option.renderer;
    // this.resources = _option.resources;
    this.scene = _option.scene;
    this.renderer = _option.renderer;
    this.camera = _option.camera;

    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder("world");
      this.debugFolder.open();
    }

    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;

    // this.setStartingScreen();

    this.setupGlobe();
    this.setupSky();
    this.time = _option.time;

    // this.setupSphere();
    this.setupLights();
    // this.setupClouds();
    this.setupBg();
  }

  setStartingScreen() {
    this.resources.on("progess", (percent) =>
      console.log(`progress ${percent}/100`)
    );
    this.resources.on("ready", () => this.start());

    const { loaded, toLoad } = this.resources.loader;
    if (loaded === toLoad) this.start();
  }

  setControls() {
    this.controls = new Controls({
      // time: this.time,
      sizes: this.sizes,
    });
  }

  setMaterial() {
    this.material = new Materials({
      resources: this.resources,
    });
  }

  setupGlobe() {
    this.globe = new Globe({scene: this.scene, renderer : this.renderer, camera: this.camera});

    this.scene.instance.add(this.globe.container);
  }

  setupSky() {
    this.sky = new Sky({scene: this.scene, renderer : this.renderer, camera: this.camera});

  }

  setupBg() {
    this.renderer.instance.setClearColor(0x040b4a);
  }


  setupSphere() {
    const globSize = 2;

    const geometry = new THREE.SphereGeometry(globSize, 256, 256);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 1,
    });

    const displacement = new THREE.TextureLoader().load(
      "/img/bump_maps_custom_v2.webp"
    );
    // const texture = new THREE.TextureLoader().load('/img/map_earth_color.jpg');
    const texture = new THREE.TextureLoader().load("/img/cot.webp");
    // const emissive = new THREE.TextureLoader().load('/img/map_earth_color.jpg');

    const sphere = new THREE.Mesh(geometry, material);

    material.map = texture;

    material.displacementMap = displacement;
    material.displacementScale = 0.2;
    material.displacementBias = 1;

    // material.emissive = 0x000000;
    // material.emissiveIntensity = 0.1;
    // material.emissiveMap = emissive

    sphere.receiveShadow = true;
    sphere.castShadow = true;

    sphere.rotation.x = -0.3;
    sphere.rotation.y = 1.5;
    sphere.rotation.z = 0;

    this.scene.instance.add(sphere);
  }



  setupLights() {
    // const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.5 );
    // this.scene.instance.add( ambientLight );

    const firstLight = new THREE.DirectionalLight(0xffffff, 0.4);
    this.scene.instance.add(firstLight);
    firstLight.position.x = 0;
    firstLight.position.y = 5;
    firstLight.position.z = -2;
    firstLight.castShadow = true;

    const secondLight = new THREE.DirectionalLight(0xffffff, 0.4);
    this.scene.instance.add(secondLight);
    secondLight.position.x = 3;
    secondLight.position.y = -20;
    secondLight.position.z = -10;
    secondLight.castShadow = true;

    const frontLight = new THREE.DirectionalLight(0xffffff, 0.4);
    this.scene.instance.add(frontLight);
    frontLight.position.x = 0;
    frontLight.position.y = 3;
    frontLight.position.z = -10;
    frontLight.castShadow = true;
  }


  // setupClouds() {
  //   const globSize = 2;

  //   const geometry = new THREE.SphereGeometry(globSize + 1.15, 256, 256);

  //   const material = new THREE.MeshStandardMaterial({
  //     color: 0xffffff,
  //     metalness: 0,
  //     roughness: 1,
  //   });

  //   const texture = new THREE.TextureLoader().load("/img/clouds_map_v2.png");

  //   const clouds = new THREE.Mesh(geometry, material);

  //   material.map = texture;
  //   material.transparent = true;
  //   material.opacity = 0.4;

  //   this.scene.instance.add(clouds);

  //   let x = clouds.rotation.x;
  //   let z = clouds.rotation.z;

  //   clouds.rotation.x = 30 + x + this.time;
  //   clouds.rotation.z = 180 + z + this.time;

  //   //sphere.rotation.x = tick;
  // }


}
