const glsl = (v) => v[0];

export const vertexShader = glsl`
    void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        modelPosition.y += sin(modelPosition.z * 4.0) * 0.2;
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;

        gl_Position = projectedPosition;
    }
`;

export const fragmentShader = glsl`
   void main() {
    float x = gl_FragCoord.y / 500.0;
    vec3 color = vec3(x);
    gl_FragColor = vec4(color, 1.0);
   }
`;
