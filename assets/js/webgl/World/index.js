import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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

    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder("world");
      this.debugFolder.open();
    }

    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;

    // this.setStartingScreen();


    this.setupSphere();

    this.setupClouds();


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
      time: this.time,
      sizes: this.sizes,
    });
  }

  setMaterial() {
    this.material = new Materials({
      resources: this.resources,
    });
  }



  setupSphere() {
    const geometry = new THREE.SphereGeometry( 2, 128, 128 );
    const material = new THREE.MeshStandardMaterial( { color: 0xFfffff , metalness : 0.5 , roughness : 0.5 } );
    // const normalMap = new THREE.TextureLoader().load( '/img/map_earth_color.jpg' );
    const displacement = new THREE.TextureLoader().load('/img/bump_maps_custom_v2.webp');
    const texture = new THREE.TextureLoader().load('/img/map_earth_color.jpg');

    const sphere = new THREE.Mesh( geometry, material );
    
     material.map = texture;
    // material.normalMap = normalMap;

    material.displacementMap = displacement;
    material.displacementScale = 0.075;
    material.displacementBias = 0.1;

    this.scene.instance.add( sphere );
  }


  setupClouds() {
  const geometry = new THREE.SphereGeometry( 2.25, 128, 128 );
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff , metalness : 0.5 , roughness : 0.5 } );
  const texture = new THREE.TextureLoader().load('/img/map_cloud.jpg');

  const clouds = new THREE.Mesh( geometry, material );

  material.map = texture;
  material.transparent = true;
  material.opacity = 0.3;

  this.scene.instance.add( clouds );

  //sphere.rotation.x = tick;

  }



  // setupLights() {
  //   const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.5 );
  //   this.scene.instance.add( ambientLight );

  //   const pointLight = new THREE.PointLight (0xffff00, 0.5);
  //   this.scene.instance.add( pointLight );
  //   pointLight.position.x = -3;
  //   pointLight.position.y = 5;
  //   pointLight.position.z = -5;

  // }



}




