import * as THREE from "three";
import { gsap } from "gsap";

import data from '/assets/data.json'

import oceanFrag from 'assets/shaders/oceanFrag.glsl'
import oceanVert from 'assets/shaders/oceanVert.glsl'
   
export default class Globe {
  /*
   * @constructor
   */
  constructor(_option) {
    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;
    this.scene = _option.scene;
    this.camera = _option.camera;
    this.time = _option.time;


    this.globe = null;
    this.dataOnScene = [];

    this.init();
    this.setupSea();

    this.updateCountry = this.updateCountry.bind(this);
    this.update = this.update.bind(this);

  }

  async init() {
    const ThreeGlobe = await (await import("three-globe")).default;

    this.globe = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: true,
    })
      // .bumpImageUrl("/img/earth-topology.png")
      .bumpImageUrl("/img/elevation_map_13_40-100.png")

      .polygonAltitude(0.03)
      .polygonStrokeColor(() => "#111")
      .showAtmosphere(true)
      .atmosphereColor("#308D98")
      .atmosphereAltitude(0.5)
      .hexPolygonColor("#ffffff");

    this.globe.rotation.set(0, 0, 0);

    let loader = new THREE.TextureLoader();

    const globeMaterial = this.globe.globeMaterial();
    globeMaterial.color = new THREE.Color(0xffffff);
    globeMaterial.emissive = new THREE.Color(0xffffff);
    globeMaterial.emissiveIntensity = 0.3;
    globeMaterial.shininess = 1;


    const displacement = await loader.load("/img/elevation_map_13_40-100.png");


    // globeMaterial.map = texture;
    // globeMaterial.normalMap = normalMap;

    globeMaterial.displacementMap = displacement;

    globeMaterial.displacementScale = 7;
    globeMaterial.displacementBias = 0.3;
    globeMaterial.lights = true;



    this.globe.receiveShadow = true;
    this.globe.castShadow = true;
    this.globe.scale.set(0.2, 0.2, 0.2);
    this.container.add(this.globe);

    // globeMaterial.wireframe = true;
  }

  updateCountry(index) {

    const ALTITUDE = 0.05;
    let color = "green"
    let currentData = data[index]

    this.dataOnScene.push(currentData);

    this.globe
      // .ringsData(this.dataOnScene)
      // .ringAltitude(1)
      // .ringColor("rgba(255,255,50, 1)")
      // .ringMaxRadius(5)
      // .ringPropagationSpeed(2)
      // .ringRepeatPeriod(1)
      .customLayerData(this.dataOnScene)
      .customThreeObject(
        (d) =>
          new THREE.Mesh(
            new THREE.PlaneGeometry( 10, 10 ),
            new THREE.MeshLambertMaterial({ color: color })
          )
      )
      .customThreeObjectUpdate((obj, d) => {
        Object.assign(obj.position, this.globe.getCoords(d.localisation.lat, d.localisation.long, ALTITUDE));
      });

    const startX = this.globe.rotation.x;
    const startY = -this.globe.rotation.y;
    const endX = currentData.localisation.lat * (Math.PI/180);
    const endY = currentData.localisation.long * (Math.PI/180);
    const anim = {x:startX, y:startY };

    gsap.to(anim, {duration:1.2, y:endY, x: endX, onUpdate: () => {
      this.globe.rotation.set(anim.x, -anim.y, 0);
    }})
  }

  // ADD WATER
  setupSea() {
    const geometrySea = new THREE.SphereGeometry(20.3, 256, 256);
    const geometryWaves = new THREE.SphereGeometry(14.3, 512, 512);


    const material = new THREE.MeshStandardMaterial({
      color: 0xebebeb,
      metalness: 0,
      roughness: 1,
    });

    const uniforms = {
      // topColor: { value: new THREE.Color(SKY_COLOR) },
      // bottomColor: { value: new THREE.Color(GROUND_COLOR) }
    };

    this.waveMat = new THREE.RawShaderMaterial ({
      uniforms :{
        uTime : {value:this.time},
        uStrength : {value:10},
        uScale : {value:5},
        depthNoise : {value:10},
      },
    vertexShader: oceanVert, 
    fragmentShader : oceanFrag,
    transparent : true,
    depthWrite : true,
    })

    // this.waveMat.lights = true;

    console.log(this.time);

    const waves = new THREE.Mesh(geometryWaves, this.waveMat);
    const sea = new THREE.Mesh(geometrySea, material);

    sea.receiveShadow = true;
    sea.castShadow = true;

    waves.receiveShadow = true;
    waves.castShadow = true;
    // waves.position.x = 30;


    this.scene.instance.add(waves);
    // this.scene.instance.add(sea);

  }


    update(time) {
      this.time = time;
      this.waveMat.uniforms.uTime.value = this.time / 15
      // console.log(this.time);
    }







// DRAFTS
  setupArc() {
        // setTimeout(() => {
    //   this.globe
    //     .arcsData(travelHistory.flights)
    //     .arcColor((e) => {
    //       return e.status ? "#9cff00" : "#FF4000";
    //     })
    //     .arcAltitude((e) => {
    //       return e.arcAlt;
    //     })
    //     .arcStroke((e) => {
    //       return e.status ? 0.5 : 0.3;
    //     })
    //     .arcDashLength(0.9)
    //     .arcDashGap(4)
    //     .arcDashAnimateTime(1000)
    //     .arcsTransitionDuration(1000)
    //     .arcDashInitialGap((e) => e.order * 1)
    //     .labelsData(airportHistory.airports)
    //     .labelColor(() => "#ffcb21")
    //     .labelDotOrientation((e) => {
    //       return e.text === "ALA" ? "top" : "right";
    //     })
    //     .labelDotRadius(0.3)
    //     .labelSize((e) => e.size)
    //     .labelText("city")
    //     .labelResolution(6)
    //     .labelAltitude(0.01)
    //     .pointsData(airportHistory.airports)
    //     .pointColor(() => "#ffffff")
    //     .pointsMerge(true)
    //     .pointAltitude(0.07)
    //     .pointRadius(0.05);
    // }, 1000);
  }
}
