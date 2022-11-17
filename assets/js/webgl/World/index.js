import * as THREE from "three";

import Globe from "./Globe";
import Sky from "./Sky";
import Marker from "./Marker";


import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Water } from "three/addons/objects/Water.js";

import { GUI } from "three/addons/libs/lil-gui.module.min.js";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { SAOPass } from "three/addons/postprocessing/SAOPass.js";
//import Sky from "./Sky";
import Skybox from "./Skybox.js"




export default class World {
  constructor(_option) {

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

    // this.setupSky();

    this.time = _option.time;

    // this.setupSphere();
    this.setupLights();
    // this.setupClouds();
    this.setupBg();
    this.lightAxisHelp()

    this.setupSkybox();

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
    // this.controls.autoRotate = true;

  }

  setMaterial() {
    this.material = new Materials({
      resources: this.resources,
    });
  }

  setupGlobe() {
    this.globe = new Globe({scene: this.scene, renderer : this.renderer, camera: this.camera})
    ;

    this.scene.instance.add(this.globe.container);
  }

  setupSky() {
    this.sky = new Sky({scene: this.scene, renderer : this.renderer, camera: this.camera});

  }

  setupBg() {
    this.renderer.instance.setClearColor(0x040b4a);
  }

  setupSkybox() {
    const skybox = new Skybox({scene: this.scene, renderer : this.renderer, camera: this.camera})
  }


  setupSphere() {
    const globSize = 0.5;

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

  setupMarker() {
    this.marker = new Marker();
    this.scene.instance.add(this.marker.container);
  }
  
  lightAxisHelp() {
    const axesHelper = new THREE.AxesHelper( 20 );
    this.scene.instance.add( axesHelper );
  }

  setupLights() {

    // const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.5 );
    // this.scene.instance.add( ambientLight );

    const firstLight = new THREE.DirectionalLight(0x00043D, 0.3);
    this.scene.instance.add(firstLight);
    firstLight.position.x = -4;
    firstLight.position.y = 8;
    firstLight.position.z = -10;
    firstLight.castShadow = true;
    const firstPointLightHelper = new THREE.PointLightHelper( firstLight, 1 );
    this.scene.instance.add( firstPointLightHelper );

    const secondLight = new THREE.DirectionalLight(0x308D98, 0.3);
    this.scene.instance.add(secondLight);
    secondLight.position.x = -6;
    secondLight.position.y = 6;
    secondLight.position.z = 10;
    secondLight.castShadow = true;
    const secondPointLightHelper = new THREE.PointLightHelper( secondLight, 1 );
    this.scene.instance.add( secondPointLightHelper );

    const frontLight = new THREE.DirectionalLight(0xFFEE4D, 0.4);
    this.scene.instance.add(frontLight);
    frontLight.position.x = -10;
    frontLight.position.y = 10;
    frontLight.position.z = 0;
    frontLight.castShadow = true;
    const frontLightHelper = new THREE.PointLightHelper( frontLight, 1 );
    this.scene.instance.add( frontLightHelper );
  }


  setupClouds() {
    const globSize = 2

    const geometry = new THREE.SphereGeometry(globSize + 1.5, 256, 256);

    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 1,
    });

    const texture = new THREE.TextureLoader().load("/img/clouds_map_v2.png");

    const clouds = new THREE.Mesh(geometry, material);

    material.map = texture;
    material.transparent = true;
    material.opacity = 0.4;

    this.scene.instance.add(clouds);

    let x = clouds.rotation.x;
    let z = clouds.rotation.z;

    clouds.rotation.x = 30 + x + this.time;
    clouds.rotation.z = 180 + z + this.time;

    //sphere.rotation.x = tick;
  }


}
