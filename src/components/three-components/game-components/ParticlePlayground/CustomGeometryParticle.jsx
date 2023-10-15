import { shaderMaterial } from "@react-three/drei";
import { memo, useMemo, useRef, useState } from "react";
import { AdditiveBlending, MathUtils } from "three";
import { extend, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import {
  customGeometryFragmentShader,
  customGeometryVertexShader,
} from "@shaders/custom-geometry-particle/custom-geometry-particle";

const CustomShaderMaterial = shaderMaterial({
  uTime: 0.0,
  uRadius: 21,
  customGeometryVertexShader,
  customGeometryFragmentShader,
});

extend({ CustomShaderMaterial });

export default memo(function CustomGeometryParticle() {
  const [uTime, setUTime] = useState();
  const count = 81500;
  const points = useRef();
  const shape = "galactic";
  const itemSize = 3;

  const controls = useControls("custom geometry shader", {
    uRadius: {
      value: 2,
      step: 0.01,
      min: -20,
      max: 20,
    },
  });

  const particlePosition = useMemo(() => {
    const positions = new Float32Array(count * itemSize);
    if (shape === "box") {
      for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 2;
        const y = (Math.random() - 0.5) * 2;
        const z = (Math.random() - 0.5) * 2;
        positions.set([x, y, z], i * itemSize);
      }
    }

    if (shape === "sphere") {
      const distance = 1;
      for (let i = 0; i < count; i++) {
        const theta = MathUtils.randFloatSpread(360);
        const phi = MathUtils.randFloatSpread(360);

        const x = distance * Math.sin(theta) * Math.cos(phi);
        const y = distance * Math.sin(theta) * Math.sin(phi);
        const z = distance * Math.cos(theta);
        positions.set([x, y, z], i * itemSize);
      }
    }

    if (shape === "galactic") {
      for (let i = 0; i < count; i++) {
        const distance = Math.sqrt(Math.random() * controls.uRadius);
        const theta = MathUtils.randFloatSpread(360);
        const phi = MathUtils.randFloatSpread(360);

        const x = distance * Math.sin(theta) * Math.cos(phi);
        const y = distance * Math.sin(theta) * Math.sin(phi);
        const z = distance * Math.cos(theta);
        positions.set([x, y, z], i * itemSize);
      }
    }
    return positions;
  }, [count, shape]);

  useFrame(({ clock }) => {
    setUTime(clock.getElapsedTime());
    /* for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      points.current.geometry.attributes.position.array[i3] +=
        Math.sin(clock.getElapsedTime() * Math.random() * 10) * 0.01;
      points.current.geometry.attributes.position.array[i3 + 1] +=
        Math.cos(clock.getElapsedTime() * Math.random() * 10) * 0.01;
      points.current.geometry.attributes.position.array[i3 + 2] +=
        Math.sin(clock.getElapsedTime() * Math.random() * 10) * 0.01;
    }
    points.current.geometry.attributes.position.needsUpdate = true; */
  });
  return (
    <>
      <points ref={points} position={[5, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={particlePosition}
            itemSize={itemSize}
          ></bufferAttribute>
        </bufferGeometry>
        <customShaderMaterial
          uTime={uTime}
          uRadius={controls.uRadius}
          /* blending={AdditiveBlending} */
          depthWrite={false}
        ></customShaderMaterial>
      </points>
    </>
  );
});
