import * as THREE from "three";

export default class Sky {

    constructor(_option) {
        this.renderer = _option.renderer;
        this.scene = _option.scene;
        this.camera = _option.camera;

        this.addSkyBox()
    }

    addSkyBox() {
        const size = 800;
        const skyboxGeo = new THREE.BoxGeometry(size, size, size)

        let skyboxArray = []
        // const front = new THREE.TextureLoader().load("img/skybox/skybox_4.jpg");
        // const back = new THREE.TextureLoader().load("img/skybox/skybox_1.jpg");
        // const up = new THREE.TextureLoader().load("img/skybox/skybox_2.jpg");
        // const down = new THREE.TextureLoader().load("img/skybox/skybox_6.jpg");
        // const right = new THREE.TextureLoader().load("img/skybox/skybox_5.jpg");
        // const left = new THREE.TextureLoader().load("img/skybox/skybox_3.jpg");

        const front = new THREE.TextureLoader().load("img/skybox_v4/skybox_v4_4.jpg");
        const back = new THREE.TextureLoader().load("img/skybox_v4/skybox_v4_1.jpg");
        const up = new THREE.TextureLoader().load("img/skybox_v4/skybox_v4_2.jpg");
        const down = new THREE.TextureLoader().load("img/skybox_v4/skybox_v4_6.jpg");
        const right = new THREE.TextureLoader().load("img/skybox_v4/skybox_v4_5.jpg");
        const left = new THREE.TextureLoader().load("img/skybox_v4/skybox_v4_3.jpg");


        skyboxArray.push(new THREE.MeshBasicMaterial({map: front}));
        skyboxArray.push(new THREE.MeshBasicMaterial({map: back}))
        skyboxArray.push(new THREE.MeshBasicMaterial({map: up}))
        skyboxArray.push(new THREE.MeshBasicMaterial({map: down}))
        skyboxArray.push(new THREE.MeshBasicMaterial({map: right}))
        skyboxArray.push(new THREE.MeshBasicMaterial({map: left}))

        const skybox = new THREE.Mesh(skyboxGeo, skyboxArray)

        for (let i=0; i<6; i++) {
            skyboxArray[i].side = THREE.BackSide
        }

        // skybox.side = THREE.DoubleSide,

        this.scene.instance.add(skybox);
      }


}