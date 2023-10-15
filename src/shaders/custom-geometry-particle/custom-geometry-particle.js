const glsl = (v) => v[0];

export const customGeometryVertexShader = glsl`
    uniform float uTime;
        uniform float uRadius;
        varying float vDistance;
        // Source: https://github.com/dmnsgn/glsl-rotate/blob/main/rotation-3d-y.glsl.js
        mat3 rotation3dY(float angle) {
            float s = sin(angle);
            float c = cos(angle);
            return mat3(
                c, 0.0, -s,
                0.0, 1.0, 0.0,
                s, 0.0, c
            );
        }
        void main() {
            float distanceFactor = pow(uRadius - distance(position, vec3(0.0)), 1.5);
            vec3 particlePosition = position * rotation3dY(uTime * 0.3 * distanceFactor);
            float size = distanceFactor * 1.5 + 3.0;

            vDistance = distanceFactor;

            vec4 modelPosition = modelMatrix * vec4(particlePosition, 1.0);
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;

            gl_Position = projectedPosition;
            gl_PointSize = size;
            gl_PointSize *= (1.0 / - viewPosition.z);
        }
`;

export const customGeometryFragmentShader = glsl`
    varying float vDistance;

        void main() {
            vec3 color = vec3(0.34, 0.53, 0.96);
            float strength = distance(gl_PointCoord, vec2(0.5));
            strength = 1.0 - strength;
            strength = pow(strength, 3.0);

            color = mix(color, vec3(0.97, 0.70, 0.45), vDistance * 0.5);
            color = mix(vec3(0.0), color, strength);
            gl_FragColor = vec4(color, strength);
        }
`;
