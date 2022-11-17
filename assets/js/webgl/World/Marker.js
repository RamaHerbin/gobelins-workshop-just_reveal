import * as THREE from "three";


export default class Marker {
    constructor() {
        this.markerMaterial = null;

        this.container = new THREE.Object3D();


        this.init();
    }

    init() {

        this.markerMaterial = new THREE.SpriteMaterial({
            map: new THREE.TextureLoader().load(
                '/img/marker.png'
            ),
            toneMapped: false,
            sizeAttenuation: false,
            depthTest: false,
            depthWrite: false
        });

	    this.marker = new THREE.Sprite(this.markerMaterial.clone());
        this.marker.scale.set(0.05, 0.05, 0.05);
        this.marker.position.set(1, 10, 5)

        this.container.add(this.marker)
    }

}