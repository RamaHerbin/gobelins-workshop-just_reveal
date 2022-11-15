import * as THREE from "three";

import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";

  // import * as dat from "dat.gui";

import Renderer from "./Renderer";
import Sizes from "../utils/Sizes";
import Camera from "./Camera";
import Scene from "./Scene";
import World from "./World";

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


/**
 * App constructor.
 * @constructor
 */

let time = 0;

export default class Application {
  constructor(_params) {
    this.$canvas = _params.$canvas;

    this.sizes = new Sizes();
    this.scene = new Scene();
    this.renderer = new Renderer(this.$canvas, this.sizes.viewport);

    this.sizes.on("resize", () => {
      const { width, height } = this.sizes.viewport;
      this.renderer.instance.setSize(width, height);
      this.renderer.instance.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
      );
    });

    this.lineMesh = null; //Access lineMesh globally
    this.composer = null;
    this.gui = null;
    this.audio = null; //Audio module load dynamically
    this.percentAnim = [0, 0, 0, 0, 0, 0];
    this.time = 0;

    this.colors = []; // set in setupMesh
    this.strings = []; //Array of wavee strings

    this.setupGUI();

    this.setupCamera();
    // this.setupGlow();

    // this.setupMesh();
    // this.setupSphere();
    // this.setupLights();
    // this.setupClouds();
   // this.setupLoader();

    this.setupWorld();
    this.onFrame();

    // this.onFrame = this.onFrame.bind(this);
  }

  setupConfig() {
    this.config = {};
    this.config.debug = window.location.hash === "#debug";
  }

  async setupGUI() {



    //   this.guiTest = (await import("dat.gui")).default;
    //   console.log('this.guiTest :>> ', this.guiTest);

    // this.gui = new this.guiTest.dat.GUI();
    // let fSettings = this.gui.addFolder("Settings");
    // fSettings.open();
  }

  setupCamera() {
    this.camera = new Camera({
      time: this.time,
      sizes: this.sizes,
      gui: this.gui,
      renderer: this.renderer,
    });

    this.scene.instance.add(this.camera.container);

    // this.time.on('tick', () => {
    //     this.renderer.render(this.scene, this.camera.instance);
    // });
  }

  setupGlow() {
    const renderScene = new RenderPass(
      this.scene.instance,
      this.camera.instance
    );

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );

    bloomPass.threshold = 0;
    bloomPass.strength = 2;
    bloomPass.radius = 0.5;

    this.composer = new EffectComposer(this.renderer.instance);

    this.composer.addPass(renderScene);
    this.composer.addPass(bloomPass);
  }



  setupMesh() {
    // Lines
    const geometry = new THREE.SphereGeometry( 15, 32, 16 );
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    const sphere = new THREE.Mesh( geometry, material );
    // this.scene.instance.add( sphere );

  }


  setupWorld() {
    //TODO: INIT WORLD
    let world = new World();
    this.scene.instance.add(world.container);
  }






  
  onFrame = () => {
    requestAnimationFrame(this.onFrame);
    this.renderer.render(this.scene.instance, this.camera.instance);
    let tick = 0;
    tick += 1;


    // this.composer.render();
  };
}
