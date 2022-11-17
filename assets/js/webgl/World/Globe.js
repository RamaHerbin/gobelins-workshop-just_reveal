import * as THREE from "three";

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

    this.init();
    this.setupSea();
  }

  async init() {
    const ThreeGlobe = await (await import('three-globe')).default

    console.log('countries :>> ', countries);

    let globe = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: true,
    })
        // .hexPolygonsData(countries.features)
      //   .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
      .showAtmosphere(true)
      .atmosphereColor("#308D98")
      .atmosphereAltitude(0.6)
      .hexPolygonColor('#ffffff')

      // .hexPolygonColor((e) => {
      //   if (
      //     ["KGZ", "KOR", "THA", "RUS", "UZB", "IDN", "KAZ", "MYS"].includes(
      //       e.properties.ISO_A3
      //     )
      //   ) {
      //     return "rgba(255,255,255, 1)";
      //   } else return "rgba(255,255,255, 0.7)";
      // });
      // const material = new THREE.MeshStandardMaterial({
      //   color: 0xffffff,
      //   metalness: 0.5,
      //   roughness: 0.5,
      // });

    const globeMaterial = globe.globeMaterial();
    console.log('globeMaterial :>> ', globeMaterial);
    globeMaterial.color = new THREE.Color(0xffffff);
    globeMaterial.emissive = new THREE.Color(0xffffff);
    globeMaterial.emissiveIntensity = 0.2;
    globeMaterial.shininess = 0.5;

    let loader = new THREE.TextureLoader()

    const displacement = await loader.load(
      '/img/elevelation_map_v2_chine_ok.png'
    );

    // const texture = await loader.load("/img/map_earth_color.jpg");
    // globeMaterial.map = texture;
    // globeMaterial.normalMap = normalMap;

    globeMaterial.displacementMap = displacement;
    globeMaterial.displacementScale = 6;
    globeMaterial.displacementBias = 0.;


    // const loaderBump = new THREE.TextureLoader();
    // const bump = await loaderBump.load('/img/earth-topology.png');
    

    // globeMaterial.bumpMap = bump;
    globeMaterial.bumpScale = 1;


    globe.receiveShadow = true;
    globe.castShadow = true;
    globe.scale.set(0.03, 0.03, 0.03)
    // globe.scale.set(0.1, 0.1, 0.1)

    globe.rotation.set(-1, 4, -1)

    globe.bumpImageUrl('/img/elevelation_map_v2_chine_ok.png');



    setTimeout(() => {
      globe.arcsData(travelHistory.flights)
        .arcColor((e) => {
          return e.status ? "#9cff00" : "#FF4000";
        })
        .arcAltitude((e) => {
          return e.arcAlt;
        })
        .arcStroke((e) => {
          return e.status ? 0.5 : 0.3;
        })
        .arcDashLength(0.9)
        .arcDashGap(4)
        .arcDashAnimateTime(1000)
        .arcsTransitionDuration(1000)
        .arcDashInitialGap((e) => e.order * 1)
        .labelsData(airportHistory.airports)
        .labelColor(() => "#ffcb21")
        .labelDotOrientation((e) => {
          return e.text === "ALA" ? "top" : "right";
        })
        .labelDotRadius(0.3)
        .labelSize((e) => e.size)
        .labelText("city")
        .labelResolution(6)
        .labelAltitude(0.01)
        .pointsData(airportHistory.airports)
        .pointColor(() => "#ffffff")
        .pointsMerge(true)
        .pointAltitude(0.07)
        .pointRadius(0.05);
    }, 1000);

    this.container.add(globe);
    // console.log('globe :>> ', globe);

    // NOTE Cool stuff
    // globeMaterial.wireframe = true;

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
    this.scene.instance.add( sea );
  }

}
