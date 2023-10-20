import { PivotControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FC, memo, useRef } from "react";
/* import CustomObject from "./CustomObject"; */
import {
  BufferGeometry,
  DoubleSide,
  Group,
  Mesh,
  NormalBufferAttributes,
} from "three";
import { button, useControls } from "leva";

interface IExperienceProps {
  envEntensity?: number;
}
const Experience: FC<IExperienceProps> = ({ envEntensity = 1 }) => {
  const cubeRef = useRef<Mesh<BufferGeometry<NormalBufferAttributes>>>(null);
  const groupRef = useRef<Group>(null);
  const sphereRef = useRef<Mesh<BufferGeometry<NormalBufferAttributes>>>(null);
  const { position, color } = useControls("sphere", {
    position: {
      value: { x: 2, y: 0 },
      step: 0.1,
      joystick: "invertY",
    },
    color: "#ff0000",
    clickMe: button(() => {
      console.log("clicked");
    }),
    choice: {
      options: ["a", "b", "c"],
    },
  });

  const { scale } = useControls("cube", {
    scale: {
      value: 1.5,
      step: 0.01,
      min: 0,
      max: 5,
    },
  });
  useFrame((state, delta) => {
    /*    const angle = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(angle) * 8;
    state.camera.position.z = Math.cos(angle) * 8;
    state.camera.lookAt(0, 0, 0); */
    // state.camera.position.x += delta;
    if (cubeRef && cubeRef.current) {
      cubeRef.current.rotation.y += delta;
    }
    // groupRef.current.rotation.y += delta;
  });
  return (
    <>
      <group position-y="1" ref={groupRef}>
        <PivotControls anchor={[0, 1, 1]} depthTest={false}>
          <mesh
            castShadow
            receiveShadow
            ref={sphereRef}
            position={[position.x, position.y, 10]}
          >
            <sphereGeometry args={[1, 32, 32]}></sphereGeometry>
            <meshStandardMaterial
              envMapIntensity={envEntensity}
              color={color}
            ></meshStandardMaterial>
            {/*  <Html
              wrapperClass="card"
              distanceFactor={6}
              center
              position={[1, 1, 0]}
              occlude={[sphereRef, cubeRef]}
            >
              <div className="card__inner">
                <h1>Hello world</h1>
                <button
                  onClick={() => {
                    alert("hello world");
                  }}
                >
                  Click
                </button>
              </div>
            </Html> */}
          </mesh>
        </PivotControls>
        <mesh
          castShadow
          position={[0, 0, 10]}
          receiveShadow
          ref={cubeRef}
          scale={scale}
        >
          <boxGeometry args={[0.5, 0.5, 0.5]}></boxGeometry>
          <meshStandardMaterial
            envMapIntensity={envEntensity}
            color="purple"
          ></meshStandardMaterial>
        </mesh>
        {/* <Float speed={5} floatIntensity={5}>
          <Text
            color="salmon"
            fontSize={1}
            position-x={-3}
            font="./inspiration/inspiration-v3-latin-regular.woff"
          >
            I Love 3Rf
          </Text>
        </Float> */}
      </group>
      <mesh rotation-x={-Math.PI * 0.5} position-y="-1" scale={10}>
        <planeGeometry></planeGeometry>
        <meshStandardMaterial
          side={DoubleSide}
          color="grey"
        ></meshStandardMaterial>
      </mesh>

      {/* <CustomObject></CustomObject> */}
    </>
  );
};

export default memo(Experience);
