import * as THREE from "three";
import { gsap } from "gsap";

// import countries from "/assets/globe-data-min.json";
import travelHistory from "/assets/my-flights.json";
import airportHistory from "/assets/my-airports.json";
import countries from "/assets/countries.json";

import countries from "/assets/globe-data-min.json";
import travelHistory from "/assets/my-flights.json"
import airportHistory from "/assets/my-airports.json"

// import fragmentShader from '/shaders/ocean.frag'
// import vertexShader from '/shaders/ocean.vert'
   
export default class Globe {
  /*
   * @constructor
   */
  constructor(_option) {
    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;
    this.scene = _option.scene;
    this.camera = _option.camera;

    this.globe = null;
    this.dataOnScene = [];

    this.init();
    this.setupSea();

    this.updateCountry = this.updateCountry.bind(this);
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
      .polygonAltitude(0.03)
      .polygonStrokeColor(() => "#111")
      .showAtmosphere(true)
      .atmosphereColor("#3a228a")
      .atmosphereAltitude(0.5)
      .hexPolygonColor("#ffffff");

    // (function moveSpheres() {
    //   gData.forEach(d => d.lat += 0.2);
    //   self.globe.customLayerData(self.globe.customLayerData());
    //   requestAnimationFrame(moveSpheres);
    // })();

    let loader = new THREE.TextureLoader();

    const globeMaterial = this.globe.globeMaterial();

    globeMaterial.color = new THREE.Color(0xffffff);
    globeMaterial.emissive = new THREE.Color(0x040b4a);
    globeMaterial.emissiveIntensity = 0.2;
    globeMaterial.shininess = 0.5;

    const displacement = await loader.load("/img/bump_maps_custom_v2.webp");
    // const texture = await loader.load("/img/map_earth_color.jpg");


    // globeMaterial.map = texture;
    // globeMaterial.normalMap = normalMap;

    globeMaterial.displacementMap = displacement;

    globeMaterial.displacementScale = 6;
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
    console.log("this.globe :>> ", this.globe);

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
    const geometry = new THREE.SphereGeometry(3.02, 256, 256);
    const material = new THREE.MeshStandardMaterial({
      color: 0xebebeb,
      metalness: 0,
      roughness: 1,
    });

    const vertexShader = `
    varying vec3 vNormal;
    
    void main()
    {
      vNormal = normalize( normalMatrix * normal );
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`;

    const fragmentShader = `
    varying vec3 vNormal;

    void main()
    {
      float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );
      gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;
    }`;

    const uniforms = {
      // topColor: { value: new THREE.Color(SKY_COLOR) },
      // bottomColor: { value: new THREE.Color(GROUND_COLOR) }
    };

    const atmosMat = new THREE.ShaderMaterial({
      // uniforms,
      vertexShader,
      fragmentShader,
      // side: THREE.FrontSide,
      // blending: THREE.NormalBlending,
      // transparent: true
    });

    const waves = new THREE.Mesh(geometry, atmosMat);
    const sea = new THREE.Mesh(geometry, material);

    sea.receiveShadow = true;
    sea.castShadow = true;

    waves.receiveShadow = true;
    waves.castShadow = true;

    // this.scene.instance.add(waves);
    this.scene.instance.add(sea);
  }

}
