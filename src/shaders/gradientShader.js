const glsl = (v) => v[0];

export const vertexShader = glsl`
    uniform float u_time;

    varying vec2 vUv;
    void main() {
        vUv = uv;
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        modelPosition.y += sin(modelPosition.x * 4.0 + u_time * 2.0) * 0.5;
        modelPosition.y += sin(modelPosition.z * 6.0 + u_time * 2.0) * 0.1;
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;

        gl_Position = projectedPosition;
    }   
`;

export const fragmentShader = glsl`
    varying vec2 vUv;

    vec3 colorA = vec3(0.912, 0.191, 0.652);
    vec3 colorB = vec3(1.000, 0.777, 0.052);
    void main() {
        vec2 normalizedPixel = gl_FragCoord.xy/600.0;
        vec3 color = mix(colorA, colorB, normalizedPixel.x);

        gl_FragColor = vec4(color, 1.0);
    }
`;
