import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
    constructor(_option) {
        this.sizes = _option.sizes;
        this.renderer = _option.renderer;

        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        this.setupInstance();
        // this.setupOrbitControls();
    }

    static get instance() {
		return this.instance;
	}

    setupInstance() {
        const { width, height } = this.sizes.viewport;
        this.instance = new THREE.PerspectiveCamera(75, width / height, 0.01, 800);
        this.instance.position.set(0, 0, 50);
        // this.instance.rotation.x = -1.16;
        // this.instance.rotation.y = 90;
        // this.instance.rotation.z = 0;

        this.container.add(this.instance);

        this.sizes.on('resize', () => {
            const { width, height } = this.sizes.viewport;
            this.instance.aspect = width / height;
            this.instance.updateProjectionMatrix();
        });
    }

    setupOrbitControls() {
        this.orbitControls = new OrbitControls(this.instance, this.renderer.instance.domElement);
    }
}