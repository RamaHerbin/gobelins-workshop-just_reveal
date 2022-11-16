import * as THREE from 'three';

import vertexShader from './vertexAtmos.vert';
import fragmentShader from './fragmentAtmos.frag';

export default function PlaneMaterial() {
    const uniforms = {
        uTime: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
    });

    return material;
}