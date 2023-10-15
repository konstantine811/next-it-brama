const glsl = (v) => v[0];

export const waterVertexShader = glsl`
    uniform float uBigWavesElevationY;
    uniform float uBigWavesElevationX;
    void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        float elevationY = sin(modelPosition.x) * uBigWavesElevationY;
        float elevationX = sin(modelPosition.z) * uBigWavesElevationX;
        modelPosition.y += elevationY;
        modelPosition.y += elevationX;
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;
    }
`;

export const waterFragmentShader = glsl`
    void main() {
        gl_FragColor = vec4(0.5, 0.8, 1.0, 1.0);
    }
`;
