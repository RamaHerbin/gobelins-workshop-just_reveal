import * as THREE from "three";

export default class Sky {

    constructor(_option) {
        this.renderer = _option.renderer;
        this.scene = _option.scene;
        this.camera = _option.camera;

        console.log("test");
        this.addSkyGradient()
    }

    addSkyGradient() {
        const SKY_COLOR = 0x308D98;
        const GROUND_COLOR = 0x00043D;
        const SKY_SIZE = 200;
    
        const vertexShader = `
          varying vec3 vWorldPosition;
                void main() {
                    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
                    vWorldPosition = worldPosition.xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                }`;
        const fragmentShader = `
          uniform vec3 topColor;
                uniform vec3 bottomColor;
                varying vec3 vWorldPosition;
                void main() {
                    float h = normalize( vWorldPosition).z;
                    gl_FragColor = vec4( mix( bottomColor, topColor, max( h, 0.0 ) ), 1.0 );
                }`;
    
        const uniforms = {
          topColor: { value: new THREE.Color(SKY_COLOR) },
          bottomColor: { value: new THREE.Color(GROUND_COLOR) },
        };
        const skyGeo = new THREE.SphereGeometry(SKY_SIZE, 32, 15);
        const skyMat = new THREE.ShaderMaterial({
          uniforms,
          vertexShader,
          fragmentShader,
          side: THREE.BackSide,
        });
    
        const sky = new THREE.Mesh(skyGeo, skyMat);
        // console.log('sky :>> ', sky);
        this.scene.instance.add(sky);
      }


}