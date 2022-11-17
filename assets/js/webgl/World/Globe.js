import * as THREE from "three";
import { gsap } from "gsap";

// import countries from "/assets/globe-data-min.json";
import travelHistory from "/assets/my-flights.json"
import airportHistory from "/assets/my-airports.json"
import countries from "/assets/countries.json"
   
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

    this.init();
    this.setupSea();

    this.updateCountry = this.updateCountry.bind(this);
    // this.water();
  }

  async init() {
    const ThreeGlobe = await (await import('three-globe')).default

    // console.log('countries :>> ', countries);
      this.globe = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: true,
    })
      .bumpImageUrl('/img/earth-topology.png')
      .polygonsData(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'))
      .polygonCapColor(() => 'rgba(200, 0, 0, 0.7)')
      .polygonSideColor(() => 'rgba(0, 200, 0, 0.1)')
      .polygonAltitude(.03)
      .polygonStrokeColor(() => '#111')
      .showAtmosphere(true)
      .atmosphereColor("#3a228a")
      .atmosphereAltitude(0.5)
      .hexPolygonColor('#ffffff')

      let loader = new THREE.TextureLoader()

    const globeMaterial = this.globe.globeMaterial();

    globeMaterial.color = new THREE.Color(0xffffff);
    globeMaterial.emissive = new THREE.Color(0x040B4A);
    globeMaterial.emissiveIntensity = 0.8;
    globeMaterial.shininess = 0.7;


    const displacement = await loader.load(
      "/img/bump_maps_custom_v2.webp"
    );
    // const texture = await loader.load("/img/map_earth_color.jpg");


    // globeMaterial.map = texture;
    // globeMaterial.normalMap = normalMap;

    globeMaterial.displacementMap = displacement;
    globeMaterial.displacementScale = 4;
    globeMaterial.displacementBias = 1;

    this.globe.receiveShadow = true;
    this.globe.castShadow = true;
    this.globe.scale.set(0.2, 0.2, 0.2)
    this.globe.rotation.set(-1, 4, -1)



    setTimeout(() => {
      this.globe.arcsData(travelHistory.flights)
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

    this.container.add(this.globe);
    // console.log('globe :>> ', globe);

    // NOTE Cool stuff
    // globeMaterial.wireframe = true;

  }

  updateCountry(index) {
      console.log('this.globe :>> ', this.globe);

      // Countries 3D object are added in the 4th child of layer group
      this.globe.polygonsData([countries.features[index]]);
      console.log('countries.features[index] :>> ', );

      let testCoord = this.globe.getCoords(countries.features[index].geometry.coordinates[0][0][0], countries.features[index].geometry.coordinates[0][0][1]);
      console.log('testCoord :>> ', testCoord);

      gsap.to(this.camera.instance.rotation, {x: testCoord.x, y: testCoord.y})
  }


  // ADD WATER
  setupSea() {
    const geometry = new THREE.SphereGeometry(20.3, 256, 256);
    const material = new THREE.MeshStandardMaterial({
      color: 0x808080,
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
      side: THREE.FrontSide,
      blending: THREE.NormalBlending,
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

  water() {
    const waterGeometry = new THREE.SphereGeometry(3, 512, 512);
    // const waterGeometry = new THREE.PlaneGeometry(1000, 1000 );

    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load(
        "/textures/waternormals.jpg",
        function (texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }
      ),
      // sunDirection: new THREE.Vector3(),
      // sunColor: 0xffffff,
      waterColor: 0x3f4dc4,
      distortionScale: 5,
      fog: this.scene.instance.fog !== undefined,
      side: THREE.DoubleSide,
    });

    water.rotation.x = 0.5;
    water.rotation.y = 3;
    water.rotation.z = 0;

    this.scene.instance.add(water);
  }







}
