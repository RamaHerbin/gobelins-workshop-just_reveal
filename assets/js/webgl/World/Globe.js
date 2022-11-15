import * as THREE from "three";
// import ThreeGlobe from "three-globe";

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
    const ThreeGlobe = await (await import('three-globe')).default()
    console.log('ThreeGlobe :>> ', ThreeGlobe);
    // let globe = new ThreeGlobe({
    //   waitForGlobeReady: true,
    //   animateIn: true,
    // })
    //   //   .hexPolygonsData(countries.features)
    //   //   .hexPolygonResolution(3)
    //   //   .hexPolygonMargin(0.7)
    //   .showAtmosphere(true)
    //   .atmosphereColor("#3a228a")
    //   .atmosphereAltitude(0.25);
    //   .hexPolygonColor((e) => {
    //     if (
    //       ["KGZ", "KOR", "THA", "RUS", "UZB", "IDN", "KAZ", "MYS"].includes(
    //         e.properties.ISO_A3
    //       )
    //     ) {
    //       return "rgba(255,255,255, 1)";
    //     } else return "rgba(255,255,255, 0.7)";
    //   });

    // const globeMaterial = globe.globeMaterial();
    // globeMaterial.color = new Color(0x3a228a);
    // globeMaterial.emissive = new Color(0x220038);
    // globeMaterial.emissiveIntensity = 0.1;
    // globeMaterial.shininess = 0.7;

    // this.container.add(globe);

    // NOTE Cool stuff
    // globeMaterial.wireframe = true;
  }
}
