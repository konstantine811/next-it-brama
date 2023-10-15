import { TransformControls } from "@react-three/drei";
/* import { useControls } from "leva"; */
import { useRef } from "react";
import { waterFragmentShader, waterVertexShader } from "@shaders/water/water";

export default function RagingSeaShader() {
  const meshRef = useRef();

  /*   useControls("wave shader", {
    wavesElevationX: {
      value: 0.4,
      step: 0.01,
      min: -2,
      max: 2,
      onChange: (v) => {
        meshRef.current.material.uniforms.uBigWavesElevationX.value = v;
      },
    },
    wavesElevationY: {
      value: 0.4,
      step: 0.01,
      min: -2,
      max: 2,
      onChange: (v) => {
        meshRef.current.material.uniforms.uBigWavesElevationY.value = v;
      },
    },
  }); */

  const uniforms = () => ({
    uBigWavesElevationX: {
      value: 0.4,
    },
    uBigWavesElevationY: {
      value: 0.4,
    },
  });

  return (
    <>
      <TransformControls>
        <mesh ref={meshRef} position={[0, 1, 0]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[5, 5, 128, 128]}></planeGeometry>
          <shaderMaterial
            fragmentShader={waterFragmentShader}
            vertexShader={waterVertexShader}
            wireframe
            uniforms={uniforms}
          ></shaderMaterial>
        </mesh>
      </TransformControls>
    </>
  );
}
