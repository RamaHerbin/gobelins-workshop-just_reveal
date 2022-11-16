import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Water } from 'three/addons/objects/Water.js';

// import { PlaneMaterial } from "../Materials/AtmosphereMaterial.js";

// import fragmentShader from '/public/shaders/basic.frag';
// import vertexShader from '/public/shaders/basic.vert';




// import Materials from './Materials';
// import Controls from './Controls';
// import Torus from "./Torus";
// import Plane from "./Plane";
// import Fox from "./Fox";
// import Transition from "./Transition";

export default class World {
  constructor(_option) {
    // this.time = _option.time;
    // this.sizes = _option.sizes;
    // this.debug = _option.debug;
    // this.light = _option.light;
    // this.camera = _option.camera;
    // this.renderer = _option.renderer;
    // this.resources = _option.resources;
    this.scene = _option.scene;
    this.renderer = _option.renderer;

    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder("world");
      this.debugFolder.open();
    }

    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;

    // this.setStartingScreen();

    this.time = _option.time;


    this.setupSphere();
    this.setupLights();
    // this.setupClouds();
    // this.ambientOcclusion()
    this.setupSea();
    // this.setupBg();
    this.addSkyGradient()
    this.water()
    
  }

  setStartingScreen() {
    this.resources.on("progess", (percent) =>
      console.log(`progress ${percent}/100`)
    );
    this.resources.on("ready", () => this.start());

    const { loaded, toLoad } = this.resources.loader;
    if (loaded === toLoad) this.start();
  }


  setControls() {
    this.controls = new Controls({
      // time: this.time,
      sizes: this.sizes,
    });
  }

  setMaterial() {
    this.material = new Materials({
      resources: this.resources,
    });
  }


  setupSphere() {
    const globSize = 2;

    const geometry = new THREE.SphereGeometry( globSize, 256, 256 );
    const material = new THREE.MeshStandardMaterial( { 
      color: 0xffffff , 
      metalness : 0. , 
      roughness : 1 } );

    const displacement = new THREE.TextureLoader().load('/img/bump_maps_custom_v2.webp');
    // const texture = new THREE.TextureLoader().load('/img/map_earth_color.jpg');
    const texture = new THREE.TextureLoader().load('/img/cot.webp');
    // const emissive = new THREE.TextureLoader().load('/img/map_earth_color.jpg');



    const sphere = new THREE.Mesh( geometry, material );
    
    material.map = texture;

    material.displacementMap = displacement;
    material.displacementScale = 0.2;
    material.displacementBias = 1.;

    // material.emissive = 0x000000;
    // material.emissiveIntensity = 0.1;
    // material.emissiveMap = emissive

    sphere.receiveShadow = true;
    sphere.castShadow = true;

    sphere.rotation.x = -0.3;
    sphere.rotation.y = 1.5;
    sphere.rotation.z = 0;



    this.scene.instance.add( sphere );
  }


  setupClouds() {
    const globSize = 2;


  const geometry = new THREE.SphereGeometry( globSize + 1.15, 256, 256 );

  const material = new THREE.MeshStandardMaterial( { 
    color: 0xffffff, 
    metalness : 0., 
    roughness : 1 
  });


  const texture = new THREE.TextureLoader().load('/img/clouds_map_v2.png');


  const clouds = new THREE.Mesh( geometry, material );


  material.map = texture;
  material.transparent = true;
  material.opacity = 0.4;


  this.scene.instance.add( clouds );

  let x = clouds.rotation.x
  let z = clouds.rotation.z

  clouds.rotation.x = 30 + x + this.time;
  clouds.rotation.z = 180 + z + this.time;

  }



  setupSea() {
    const globSize = 2;


    const geometry = new THREE.SphereGeometry( globSize+1.01, 256, 256 );
    const material = new THREE.MeshStandardMaterial( { 
      color: 0x575757, 
      metalness : 0., 
      roughness : 1 
    });



    const vertexShader = `
    varying vec3 vNormal;
    
    void main()
    {
      vNormal = normalize( normalMatrix * normal );
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`
          
    const fragmentShader = `
    varying vec3 vNormal;

    void main()
    {
      float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );
      gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;
    }`

    const uniforms = {
      // topColor: { value: new THREE.Color(SKY_COLOR) },
      // bottomColor: { value: new THREE.Color(GROUND_COLOR) }
    }



    const atmosMat = new THREE.ShaderMaterial({
      // uniforms,
      vertexShader,
      fragmentShader,
      side: THREE.FrontSide,
      blending: THREE.NormalBlending,
      // transparent: true
    })
  
    const atmos = new THREE.Mesh( geometry, atmosMat );
    const sea = new THREE.Mesh( geometry, material );


    sea.receiveShadow = true;
    sea.castShadow = true;


    this.scene.instance.add( atmos );
    // this.scene.instance.add( sea );

  
  }





  water() {

    const globSize = 2;

    const waterGeometry = new THREE.SphereGeometry( globSize + 1.02, 256, 256 );
    // const waterGeometry = new THREE.PlaneGeometry(1000, 1000 );



    const water = new Water(
      waterGeometry,
      {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load( '/textures/waternormals.jpg', function ( texture ) {

          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

        } ),
        // sunDirection: new THREE.Vector3(),
        // sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: this.scene.instance.fog !== undefined
      }
    );

    water.rotation.x = 0.5;
    water.rotation.y = 3;
    water.rotation.z = 0;

    this.scene.instance.add( water );


  }


addSkyGradient() {

  const SKY_COLOR = 0x3f4dc4
  const GROUND_COLOR = 0x040B4A
  const SKY_SIZE = 40

      const vertexShader = `
      varying vec3 vWorldPosition;
            void main() {
                vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
                vWorldPosition = worldPosition.xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }`
      const fragmentShader = `
      uniform vec3 topColor;
            uniform vec3 bottomColor;
            varying vec3 vWorldPosition;
            void main() {
                float h = normalize( vWorldPosition).z;
                gl_FragColor = vec4( mix( bottomColor, topColor, max( h, 0.0 ) ), 1.0 );
            }`

      const uniforms = {
        topColor: { value: new THREE.Color(SKY_COLOR) },
        bottomColor: { value: new THREE.Color(GROUND_COLOR) }
      }
      const skyGeo = new THREE.SphereGeometry(SKY_SIZE, 32, 15)
      const skyMat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide
      })

      const sky = new THREE.Mesh(skyGeo, skyMat)
      this.scene.instance.add(sky)
}

  


  setupLights() {
    // const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.5 );
    // this.scene.instance.add( ambientLight );

    const firstLight = new THREE.DirectionalLight (0xffffff, 0.4);
    this.scene.instance.add( firstLight );
    firstLight.position.x = 0;
    firstLight.position.y = 5;
    firstLight.position.z = -2;
    firstLight.castShadow = true;

    const secondLight = new THREE.DirectionalLight (0xffffff, 0.4);
    this.scene.instance.add( secondLight );
    secondLight.position.x = 3;
    secondLight.position.y = -20;
    secondLight.position.z = -10;
    secondLight.castShadow = true;


    const frontLight = new THREE.DirectionalLight (0xffffff, 0.4);
    this.scene.instance.add( frontLight );
    frontLight.position.x = 0;
    frontLight.position.y = 3;
    frontLight.position.z = -10;
    frontLight.castShadow = true;


  }



  setupBg() {
    this.renderer.instance.setClearColor( 0x040B4A );

  }


// // test ambient occlusion : not working utd

// ambientOcclusion() {
//   composer = new THREE.EffectComposer( this.renderer.instance );
//   renderPass = new THREE.RenderPass( this.scene.instance, this.camera.instance );
//   composer.addPass( renderPass );
//   saoPass = new THREE.SAOPass( this.scene.instance, this.camera.instance, false, true );
//   composer.addPass( saoPass );
// }




}




