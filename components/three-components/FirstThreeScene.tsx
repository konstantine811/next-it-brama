import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { DoubleSide } from "three";

export default function FirstThreeScene() {
  return (
    <Canvas
      className="border border-violet-950 rounded"
      shadows
      camera={{
        position: [-60, 70, 70],
      }}
    >
      <ambientLight color="white" intensity={1} />
      <OrbitControls />
      <mesh position-y={5.1} receiveShadow castShadow>
        <boxGeometry args={[10, 10, 10]}></boxGeometry>
        <meshPhysicalMaterial color="#151515" />
      </mesh>
      <mesh receiveShadow rotation-x={-Math.PI / 2}>
        <planeGeometry args={[50, 50, 1, 1]}></planeGeometry>
        <meshStandardMaterial side={DoubleSide}></meshStandardMaterial>
      </mesh>
    </Canvas>
  );
}
