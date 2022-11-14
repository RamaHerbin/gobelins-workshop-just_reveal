import * as THREE from "three";

import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";

import * as dat from "dat.gui";
import Renderer from "./Renderer";
import Sizes from "../utils/Sizes";
import Camera from "./Camera";
import Scene from "./Scene";
import String from "./String";

import music from "/static/feel-good.mp3";

/**
 * App constructor.
 * @constructor
 */
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
    this.setupGlow();

    this.setupMesh();
    this.setupAudio();
    this.onFrame();

    // this.onFrame = this.onFrame.bind(this);
  }

  setupConfig() {
    this.config = {};
    this.config.debug = window.location.hash === "#debug";
  }

  setupGUI() {
    this.gui = new dat.GUI();
    let fSettings = this.gui.addFolder("Settings");
    fSettings.open();
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
    this.colors = [
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(1, 0, 1),
      new THREE.Vector3(1, 1, 0),
      new THREE.Vector3(0, 1, 1),
    ];

    const stringPositions = [];
    const stringColors = [];
    const divisions = 300;

    for (let i = 0; i < divisions; i++) {
      stringPositions.push((i / divisions) * 100, 0, 0);
      stringColors.push(1, 1, 1);
    }

    const LINE_NB = 6;

    const group = new THREE.Group();

    // Create lines, add to group
    for (let j = 0; j < LINE_NB; j++) {
      this.strings[j] = new String({
        colors: stringColors,
        positions: stringPositions,
        stringIndex: j,
      });

      this.strings[j].position.z = j;
      group.add(this.strings[j]);
    }

    this.scene.instance.add(group);
  }

  setupAudio() {
    // Setup audio on click
    // to avoid anti-autoplay policy
    const onBeat = () => {
      // console.log("onBeat");

      for (let index = 0; index < this.strings.length; index++) {
        this.strings[index].changeColor(this.colors[index]);
        this.percentAnim[index] > 1 ? (this.percentAnim[index] = 0) : "";
      }
    };

    let audioEvent = async (e) => {
      this.audio = (await import("../utils/audio")).default;

      this.audio.start({
        onBeat: onBeat,
        live: false,
        src: music,
        // debug: true
      });

      document.querySelector(".consigne").classList.add("hide");
      document.querySelector(".logo-gobelins").classList.add("hide");
      window.removeEventListener("click", audioEvent);
    };
    window.addEventListener("click", audioEvent);
  }

  onFrame = () => {
    requestAnimationFrame(this.onFrame);
    this.renderer.render(this.scene.instance, this.camera.instance);

    this.composer.render();

    if (this.audio && this.audio.isPlaying) {
      this.audio.update();

      this.time += 0.01;

      for (let index = 0; index < this.strings.length; index++) {
        this.percentAnim[index] += 0.01 + 0.01 * (index / 2);

        this.strings[index].update(
          this.audio.values[index],
          this.percentAnim[index],
          this.time,
          Math.random(),
          this.audio.values[0]
        );
      }
    }
  };
}
