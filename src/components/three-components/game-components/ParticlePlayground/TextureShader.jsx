import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame, useLoader } from "@react-three/fiber";
import { memo, Suspense, useRef } from "react";
import { Color, DoubleSide, Texture, TextureLoader } from "three";
import { useControls } from "leva";

const WaveShaderMaterial = shaderMaterial(
  // Uniform,
  {
    uTime: 0,
    uColor: new Color(0.0, 0.0, 0.0),
    uNoiseFreq: 0.1,
    uNoiseAmp: 0.1,
    uTexture: new Texture(),
  },
  // Vertex shader
  /*glsl*/ `
        precision mediump float;
        
        uniform float uTime;
        uniform float uNoiseFreq;
        uniform float uNoiseAmp;
        varying vec2 vUv;

        #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);
        void main() {
            vUv = uv;
            vec3 pos = position;
            vec3 noisePos = vec3(pos.x * uNoiseFreq + uTime, pos.y, pos.z);
            pos.z += snoise3(noisePos) * uNoiseAmp;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
  // Fragment shader
  /*glsl*/ `
        precision mediump float;

        uniform vec3 uColor;
        uniform float uTime;
        uniform sampler2D uTexture;

        varying vec2 vUv;

        void main() {
            vec3 texture = texture2D(uTexture, vUv).rgb;
            gl_FragColor = vec4(texture, 1.0);
        }
    `
);

extend({ WaveShaderMaterial });

const Wave = () => {
  const [image] = useLoader(TextureLoader, ["/own.jpg"]);
  const ref = useRef();
  const planeSegments = 16 * 1;
  const controls = useControls("texture shader", {
    uNoiseFreq: {
      value: 2,
      step: 0.01,
      min: -4,
      max: 4,
    },
    uNoiseAmp: {
      value: 0.09,
      step: 0.01,
      min: -2,
      max: 2,
    },
  });
  useFrame(({ clock }) => {
    ref.current.uTime = clock.getElapsedTime();
  });
  return (
    <mesh scale={5} position={[0, 1, 3]}>
      <planeGeometry
        args={[0.4, 0.6, planeSegments, planeSegments]}
      ></planeGeometry>
      <waveShaderMaterial
        uColor={"hotpink"}
        uNoiseFreq={controls.uNoiseFreq}
        uNoiseAmp={controls.uNoiseAmp}
        uTexture={image}
        ref={ref}
        side={DoubleSide}
      ></waveShaderMaterial>
    </mesh>
  );
};

export default memo(function TextureShader() {
  return (
    <Suspense fallback={null}>
      <Wave />
    </Suspense>
  );
});
