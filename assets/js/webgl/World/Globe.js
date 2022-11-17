import * as THREE from "three";
import { gsap } from "gsap";

// import countries from "/assets/globe-data-min.json";
// import travelHistory from "/assets/my-flights.json";
// import airportHistory from "/assets/my-airports.json";
// import countries from "/assets/countries.json";

import countries from "/assets/globe-data-min.json";
import travelHistory from "/assets/my-flights.json"
import airportHistory from "/assets/my-airports.json"

import fragmentShader from 'assets/shaders/oceanFrag.glsl'
import vertexShader from 'assets/shaders/oceanVert.glsl'
   
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
    const self = this;

    // console.log('countries :>> ', countries);
    this.globe = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: true,
    })
      .bumpImageUrl("/img/earth-topology.png")
      // .bumpImageUrl("/img/elevation_map_13_40-100.png")

      .polygonAltitude(0.03)
      .polygonStrokeColor(() => "#111")
      .showAtmosphere(true)
      .atmosphereColor("#308D98")
      .atmosphereAltitude(0.7)
      .hexPolygonColor("#ffffff");

    // (function moveSpheres() {
    //   gData.forEach(d => d.lat += 0.2);
    //   self.globe.customLayerData(self.globe.customLayerData());
    //   requestAnimationFrame(moveSpheres);
    // })();

    let loader = new THREE.TextureLoader();

    const globeMaterial = this.globe.globeMaterial();

    globeMaterial.color = new THREE.Color(0xffffff);
    globeMaterial.emissive = new THREE.Color(0xffffff);
    globeMaterial.emissiveIntensity = 0.3;
    globeMaterial.shininess = 1;


    const displacement = await loader.load("/img/elevation_map_13_40-100.png");
    // const texture = await loader.load("/img/map_earth_color.jpg");


    // globeMaterial.map = texture;
    // globeMaterial.normalMap = normalMap;

    globeMaterial.displacementMap = displacement;

    globeMaterial.displacementScale = 8;
    globeMaterial.displacementBias = 0;


    this.globe.receiveShadow = true;
    this.globe.castShadow = true;
    this.globe.scale.set(0.2, 0.2, 0.2);
    this.globe.rotation.set(-1, 4, -1);

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
    

    this.container.add(this.globe);

    // console.log('globe :>> ', globe);

    // NOTE Cool stuff
    // globeMaterial.wireframe = true;
  }

  updateCountry(index) {
    // console.log("this.globe :>> ", this.globe);

    const gData = [
      {
        lat: 48.8566,
        lng: 2.3522,
        alt: 0.1,
        radius: Math.random() * 5,
        color: "red",
      },
      {
        lat: 90,
        lng: 90,
        alt: 0.03,
        radius: Math.random() * 5,
        color: "green",
      },
      {
        lat: 10,
        lng: 20,
        alt: 0.03,
        radius: Math.random() * 5,
        color: "green",
      },
      {
        lat: 5,
        lng: 30,
        alt: 0.03,
        radius: Math.random() * 5,
        color: "green",
      },
      {
        lat: 10,
        lng: 20,
        alt: 0.03,
        radius: Math.random() * 5,
        color: "green",
      },
      {
        lat: 5,
        lng: 30,
        alt: 0.03,
        radius: Math.random() * 5,
        color: "green",
      },
    ];

    this.dataOnScene.push(gData[index]);

    let currentDataCoord = this.globe.getCoords(
      gData[index].lat,
      gData[index].lng,
      gData[index].alt
    );

    this.globe
      .customLayerData(this.dataOnScene)
      .customThreeObject(
        (d) =>
          new THREE.Mesh(
            new THREE.SphereGeometry(d.radius),
            new THREE.MeshLambertMaterial({ color: d.color })
          )
      )
      .customThreeObjectUpdate((obj, d) => {
        console.log("index :>> ", index);
        console.log(d);
        Object.assign(obj.position, this.globe.getCoords(d.lat, d.lng, d.alt));

        // this.camera.instance.lookAt(obj.position)

        // gsap
        //   .to(this.camera.instance.position, {
        //     x: currentDataCoord.x,
        //     y: currentDataCoord.y,
        //   })
        //   .then(this.camera.instance.lookAt(obj.position));
      });

    console.log("currentDataCoord :>> ", currentDataCoord);
    console.log(
      "this.globe.children[0].children[12].children :>> ",
      this.globe.children[0].children[12].children
    );
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
    vertexShader: vertexShader, 
    fragmentShader : fragmentShader,
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

    this.scene.instance.add(waves);
    // this.scene.instance.add(sea);

  }


    update(time) {
      this.time = time;
      this.waveMat.uniforms.uTime.value = this.time / 15
      // console.log(this.time);
    }

}
