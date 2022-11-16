import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
    constructor(_option) {
        // this.time = _option.time;
        this.sizes = _option.sizes;
        this.gui = _option.gui;

        this.renderer = _option.renderer;

        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        this.setupInstance();
        this.setupOrbitControls();
    }

    static get instance() {
		return this.instance;
	}

    setupInstance() {
        const { width, height } = this.sizes.viewport;
        this.instance = new THREE.PerspectiveCamera(75, width / height, 0.01, 300);
        this.instance.position.set(0, 5, -8);
        // this.instance.rotation.x = -1.16;
        // this.instance.rotation.y = 15;
        // this.instance.rotation.z = -10;
        // this.instance.lookAt(new THREE.Vector3());
        this.container.add(this.instance);

        // let fCamera = this.gui.addFolder("Camera");

        // fCamera.add(this.instance.position, "x", -70, 30, 1);
        // fCamera.add(this.instance.position, "y", -30, 30, 1);
        // fCamera.add(this.instance.position, "z", -30, 60, 1);
        // fCamera.add(this.instance.rotation, "x", -2, 1, .01);
        // fCamera.add(this.instance.rotation, "y", -1, 1, .01);
        // fCamera.add(this.instance.rotation, "z", -1, 1, .01);

        this.sizes.on('resize', () => {
            const { width, height } = this.sizes.viewport;
            this.instance.aspect = width / height;
            this.instance.updateProjectionMatrix();
        });


    }

    setupOrbitControls() {
        this.orbitControls = new OrbitControls(this.instance, this.renderer.instance.domElement);
        // this.orbitControls.enableDamping = true;

        // this.time.on('tick', () => this.orbitControls.update());
    }
}