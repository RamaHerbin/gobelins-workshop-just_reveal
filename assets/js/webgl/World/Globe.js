import * as THREE from "three";

import countries from "/assets/globe-data-min.json";
import travelHistory from "/assets/my-flights.json"
import airportHistory from "/assets/my-airports.json"
   
export default class Globe {
  /*
   * @constructor
   */
  constructor() {

    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;

    this.init();
  }

  async init() {
    const ThreeGlobe = await (await import('three-globe')).default

    console.log('countries :>> ', countries);

    let globe = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: true,
    })
        .hexPolygonsData(countries.features)
      //   .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
      .showAtmosphere(true)
      .atmosphereColor("#3a228a")
      .atmosphereAltitude(0.25)
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
    globeMaterial.color = new THREE.Color(0x3a228a);
    globeMaterial.emissive = new THREE.Color(0x220038);
    globeMaterial.emissiveIntensity = 0.5;
    globeMaterial.shininess = 0.7;

    let loader = new THREE.TextureLoader()

    const displacement = await loader.load(
      "/img/bump_maps_custom_v2.webp"
    );
    // const texture = await loader.load("/img/map_earth_color.jpg");


    // globeMaterial.map = texture;
    // globeMaterial.normalMap = normalMap;

    globeMaterial.displacementMap = displacement;
    globeMaterial.displacementScale = 3;
    globeMaterial.displacementBias = 1;


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
    console.log('globe :>> ', globe);

    // NOTE Cool stuff
    // globeMaterial.wireframe = true;
  }
}
