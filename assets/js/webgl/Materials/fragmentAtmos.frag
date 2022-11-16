
varying vec2 vUv;

void main()
{
    vec3 color = vec3(vUv, 1.0);

    gl_FragColor = vec4(color, 1.0);
}



// uniform vec3	glowColor;
// 		uniform float	coeficient;
// 		uniform float	power;

// 		varying vec3	vVertexNormal;',
// 		varying vec3	vVertexWorldPosition;',

// 		void main()
//         {
// 			vec3 worldCameraToVertex= vVertexWorldPosition - cameraPosition;
// 			vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
// 			viewCameraToVertex	= normalize(viewCameraToVertex);
// 			float intensity		= pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);
// 			gl_FragColor		= vec4(glowColor, intensity);
// 		}


// from another thing ^^^^^^^^^^^^^^^^^^^^^^^^^^
// ----------------------------------------------


// STARTER vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

