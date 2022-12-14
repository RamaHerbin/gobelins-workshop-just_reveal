import * as THREE from "three";
import { gsap } from "gsap";
import hexRgb from 'hex-rgb';
import ThreeGlobe from "three-globe";

import oceanFrag from "assets/shaders/oceanFrag.glsl";
import oceanVert from "assets/shaders/oceanVert.glsl";
import { COLORS } from "~~/constants"
import { removeAccents } from "~~/utils/typo"

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
    this.$canvas = _option.$canvas;
    this.sizes = _option.sizes;

    this.globe = null;
    this.dataOnScene = [];
    this.ringsOnScene = [];
    this.arrayOfMeshesToCast = []
    this.init();
    // this.setupSea();

    this.updateCountry = this.updateCountry.bind(this);
    this.update = this.update.bind(this);

    this.isPointerDown = false;
    this.isCursorMoved = false;

    this.WINDOW_WIDTH = this.sizes.viewport.width;
    this.WINDOW_HEIGHT = this.sizes.viewport.height;

    this.mouseX = 0;
    this.mouseY = 0;

    this.initGlobeControls();
  }

  async init() {

    this.globe = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: true,
    })
      .bumpImageUrl("/img/elevation_map_13_40-100.webp")
      .polygonAltitude(0.03)
      .polygonStrokeColor(() => "#ffffff")
      .showAtmosphere(true)
      .atmosphereColor("#308D98")
      .atmosphereAltitude(0.5)
      .hexPolygonColor("#ffffff");

    let loader = new THREE.TextureLoader();

    const globeMaterial = this.globe.globeMaterial();
    globeMaterial.color = new THREE.Color(0xffffff);
    globeMaterial.emissive = new THREE.Color(0xffffff);
    globeMaterial.emissiveIntensity = 0.3;
    globeMaterial.shininess = 0.2;

    const displacement = await loader.load("/img/elevation_map_13_40-100.webp");

    globeMaterial.displacementMap = displacement;
    globeMaterial.displacementScale = 4;
    globeMaterial.displacementBias = 0.3;
    globeMaterial.lights = true;



    this.globe.receiveShadow = true;
    this.globe.castShadow = true;
    this.globe.rotation.set(0, 0, 0);
    this.globe.position.set(0, -6, 0);

    if (this.WINDOW_WIDTH < 1000) {
     this.globe.scale.set(0.14, 0.14, 0.14);
    } else {
     this.globe.scale.set(0.2, 0.2, 0.2);
    }

    this.container.add(this.globe);

    // globeMaterial.wireframe = true;
  }

  updateCountry(news) {
    const ALTITUDE = 0.11;
    let color = "green";
    let currentData = news;

    let isAlreadyOnScene = this.dataOnScene.filter(el => 
      el.date == news.date
    )

    if (isAlreadyOnScene.length === 0) {
      this.dataOnScene.push(currentData);

      this.ringsOnScene.push({
        lat: currentData.localisation.lat,
        lng: currentData.localisation.long
      })
    }

    const ringColor = COLORS.find(el => el.label === removeAccents(currentData.type))?.hex.primary;
    const ringRgb = hexRgb(ringColor);
    const higherNumber = Math.min(...[ringRgb.red, ringRgb.green, ringRgb.blue]);

    const colorInterpolator = t => `rgba(${ringRgb.red - higherNumber}, ${ringRgb.green - higherNumber}, ${ringRgb.blue - higherNumber}, ${1 - t})`;

    const globeCenter = this.scene.instance.localToWorld(new THREE.Vector3(0, 0, 0)); // translate from local to world coords

    this.globe
      .ringsData(this.ringsOnScene)
      .ringAltitude(.06)
      .ringColor(() => colorInterpolator)
      .ringMaxRadius(10)
      .ringPropagationSpeed(3)
      .ringRepeatPeriod(500)
      .customLayerData(this.dataOnScene)
      .customThreeObject(
        (d) =>
          new THREE.Mesh(
            new THREE.PlaneGeometry(20, 20),
            new THREE.MeshLambertMaterial({ color: color })
          )
      )
      .customThreeObjectUpdate((obj, d) => {
        Object.assign(
          obj.position,
          this.globe.getCoords(
            d.localisation.lat,
            d.localisation.long,
            ALTITUDE
          )
        );
        obj.lookAt(globeCenter);

        obj.rotation.y = 10;

        this.arrayOfMeshesToCast.push(obj)
        obj.visible = false
      });

      this.centerPoints(currentData)
  }

  centerPoints(data, modifierX = 0,modifierY = 0) {
    const startX = this.globe.rotation.x;
    const startY = -this.globe.rotation.y;
    const endX = data.localisation.lat * (Math.PI / 180);
    const endY = data.localisation.long * (Math.PI / 180);
    const anim = { x: startX, y: startY };

    if (this.WINDOW_WIDTH > 900)
      gsap.to(this.globe.position, {duration:1, x: -18})
    else 
      gsap.to(this.globe.position, {duration:1, y: 4})

    gsap.to(anim, {
      duration: 1.2,
      y: endY + modifierY,
      x: endX + modifierX,
      onUpdate: () => {
        this.globe.rotation.set(anim.x, -anim.y, 0);
      },
    });
  }

  pointerDown = (e) => {
    const [x,y] = parseMouseEvent(e);

    this.isPointerDown = true;
    this.mouseX = x;
    this.mouseY = y;
  }

  pointerUp = (e) => {
    const [x,y] = parseMouseEvent(e);
    
    this.isPointerDown = false;

    if (!this.isCursorMoved) {
      this.checkSurface(x, y)
    }
    this.isCursorMoved = false;
  }

  pointerMove = (e) => {
    const [x,y] = parseMouseEvent(e);
    
    if (this.isPointerDown) {
      this.isCursorMoved = true;
      var deltaX = x - this.mouseX,
        deltaY = y - this.mouseY;
      this.mouseX = x;
      this.mouseY = y;
      this.globe.rotation.y += deltaX / 100;
      this.globe.rotation.x += deltaY / 100;
    }
  }

  initGlobeControls() {

    this.$canvas.addEventListener("pointerdown", this.pointerDown);
    this.$canvas.addEventListener("touchstart", this.pointerDown);

    this.$canvas.addEventListener("touchstop", this.pointerUp);
    this.$canvas.addEventListener("pointerup", this.pointerUp);

    this.$canvas.addEventListener("mousemove", this.pointerMove);
    this.$canvas.addEventListener("touchmove", this.pointerMove);
  }

  checkSurface(x, y) {
    const mouse = new THREE.Vector2();
  	const raycaster = new THREE.Raycaster();

    mouse.x = ( x / window.innerWidth ) * 2 - 1;
		mouse.y = - ( y / window.innerHeight ) * 2 + 1;
		raycaster.setFromCamera( mouse, this.camera.instance );
		let intersects = raycaster.intersectObjects( this.arrayOfMeshesToCast, true );
    
		if (intersects.length > 0) {

      const previousNews = usePreviousNews();

      // watched value on webgl.vue
      previousNews.value = intersects[0].object.__data;

      // ZOOM POSITION
      // this.globe.showAtmosphere(false)
      // this.centerPoints(intersects[0].object.__data, -.25, -.25)
      // gsap.to(this.globe.position, {duration:1, x:-24, y: -10, z: 14})
		}
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

    this.waveMat = new THREE.RawShaderMaterial({
      uniforms: {
        uTime: { value: this.time },
        uStrength: { value: 10 },
        uScale: { value: 5 },
        depthNoise: { value: 10 },
      },
      vertexShader: oceanVert,
      fragmentShader: oceanFrag,
      transparent: true,
      depthWrite: true,
    });

    // this.waveMat.lights = true;

    const waves = new THREE.Mesh(geometryWaves, this.waveMat);
    const sea = new THREE.Mesh(geometrySea, material);

    sea.receiveShadow = true;
    sea.castShadow = true;

    waves.receiveShadow = true;
    waves.castShadow = true;
    // waves.position.x = 30;

    this.scene.instance.add(waves);
    // this.scene.instance.add(sea);
  }

  update(time) {
    this.time = time;
    this.waveMat.uniforms.uTime.value = this.time / 15;
  }

  // DRAFTS
  setupArc() {
    setTimeout(() => {
      this.globe
        .arcsData(travelHistory.flights)
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
  }
}


const parseMouseEvent = (e) => {
  let x;
  let y;

  if (e.changedTouches && e.changedTouches.length) {
    x = e.changedTouches[0].clientX;
    y = e.changedTouches[0].clientY;
    return [x, y];
  }
  x = e.x;
  y = e.y;
  return [x, y];
};