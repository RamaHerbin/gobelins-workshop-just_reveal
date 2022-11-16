import * as THREE from 'three';



export default class Renderer {

/**
 * This is the renderer constructor.
 *
 * @param {_$canvas} - DOM canvas
 * @param {_viewport} - Object containing height and width of viewport
 *
 * @constructor
 *
 */
  constructor(_$canvas, _viewport) {
    this.instance = new THREE.WebGLRenderer({
      antialias: true, 
      canvas: _$canvas,

    });

    const { width, height } = _viewport;
    this.instance.setSize(width, height);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.instance.toneMapping = THREE.ReinhardToneMapping;
    this.instance.toneMappingExposure = Math.pow(1.35, 4);
    this.instance.shadowMap.enabled = true;
  }

  render(scene, camera) {
    this.instance.render(scene, camera);
  }


}
