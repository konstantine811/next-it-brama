import { TransformControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useMemo, useRef } from "react";
import { DoubleSide } from "three";

/* import { fragmentShader, vertexShader } from "../shaders/waveShader"; */
import { fragmentShader, vertexShader } from "@shaders/gradientShader";

export default memo(function ShaderTrain() {
  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
    }),
    []
  );
  const mesh = useRef();

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });
  return (
    <>
      <TransformControls position={[-7, 1, 0]} mode="rotate">
        <mesh castShadow ref={mesh} rotation={[-Math.PI / 2, 0, 0]} scale={1}>
          <planeGeometry args={[3, 3, 32, 32]} />
          <shaderMaterial
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
            wireframe={false}
            side={DoubleSide}
            uniforms={uniforms}
          />
        </mesh>
      </TransformControls>
      <axesHelper></axesHelper>
    </>
  );
});
