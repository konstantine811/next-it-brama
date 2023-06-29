import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";

export default function FirstThreeScene() {
  return (
    <Canvas
      className="border rounded"
      shadows
      camera={{
        position: [-6, 7, 7],
      }}
    >
      <ambientLight color="white" intensity={1} />
      <OrbitControls />
      <mesh recieveShadow>
        <boxGeometry args={[10, 10, 10]}></boxGeometry>
        <meshPhysicalMaterial color="#151515" />
      </mesh>
    </Canvas>
  );
}
