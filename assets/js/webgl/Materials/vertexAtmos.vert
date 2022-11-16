
uniform float uTime;
varying vec2 vUv;

void main()
{
    vec3 newPosition = position;
    newPosition.z += sin(newPosition.x * 5.0 - uTime) * 0.05;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
}





// precision highp float;

// varying vec3	vVertexWorldPosition,
// varying vec3	vVertexNormal

// void main()
// {
// 	vVertexNormal	= normalize(normalMatrix * normal);
//     vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;

// 	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);

//     gl_Position = vec4(position, 1.0)

// }



// from another thing ^^^^^^^^^^^^^^^^^^^^^^^^^^
// ----------------------------------------------


// STARTER vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

