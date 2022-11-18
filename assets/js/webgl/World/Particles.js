import * as THREE from "three";

import partFrag from 'assets/shaders/partFrag.glsl'
import partVert from 'assets/shaders/partVert.glsl'
   
export default class Particles {
  /*
   * @constructor
   */
  constructor(_option) {
    this.scene = _option.scene;
    this.camera = _option.camera;
    this.time = _option.time;

    this.globe = null;
    this.dataOnScene = [];

    // this.init();
    this.setupStars();

    // this.updateCountry = this.updateCountry.bind(this);
    // this.update = this.update.bind(this);
  }



//   init() {



//   }



  setupStars() {

    const nbParticles = 5000
	const vertices = []
	const color =[]
	const randoms = []

	for (let i=0; i < nbParticles; i++ ) {
		// Position : x, y, z
		const x = Math.random() * 800 - 400
		const y = Math.random() * 800 - 400
		const z = Math.random() * 800 - 400
		vertices.push (x, y, z)

		// const r = Math.random() * 1
		// const g = Math.random() * 1
		// const b = Math.random() * 1
        const r = 0.9
		const g = 0.9
		const b = 0.9

		color.push (r, g, b)

		randoms.push(Math.random())
	}

	const point = new THREE.BufferGeometry()
	point.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
	point.setAttribute('color', new THREE.Float32BufferAttribute(color, 3))
	point.setAttribute('random', new THREE.Float32BufferAttribute(randoms, 1))



    this.particleMat = new THREE.RawShaderMaterial ({
      uniforms :{
        uTime : {value:this.time},
        uStrength : {value:2.},
        uScale : {value:10.},
        depthNoise : {value:2.},
      },
    vertexShader: partVert, 
    fragmentShader : partFrag,
    transparent : true,
    depthWrite : true,
    })


	const particles = new THREE.Points(point, this.particleMat)
    this.scene.instance.add(particles);

  }


    update(time) {
      this.time = time;
      this.particleMat.uniforms.uTime.value = this.time / 15
      // console.log(this.time);
    }












}
