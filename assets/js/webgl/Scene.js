import * as THREE from "three";

export default class Scene {
  constructor(_params) {
    this.instance = new THREE.Scene();

    // const ambient = new THREE.AmbientLight(0xaafff0);
    // this.instance.add(ambient);

    // const lightBehind = new THREE.PointLight(0xff00ff, 1);
    // lightBehind.position.x = 5;
    // lightBehind.position.y = 5;
    // lightBehind.position.z = -5;

    // this.instance.add(lightBehind);
    // // this.instance.add(new THREE.PointLightHelper(lightBehind, 0.2));

    // const lightFront = new THREE.PointLight(0x00ffff, 0.5);
    // lightFront.position.x = -5;
    // lightFront.position.y = -5;
    // lightFront.position.z = 5;

    // this.instance.add(lightFront);
    // this.instance.add(new THREE.PointLightHelper(lightFront, 0.2));


    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);

    this.directionalLight.castShadow = true;

    this.instance.add(this.ambientLight);
    this.instance.add(this.directionalLight);

    // this.setupAxis()
  }

  setupAxis() {
    const axesHelper = new THREE.AxesHelper( 5 );
    this.instance.add( axesHelper );
  }
}
