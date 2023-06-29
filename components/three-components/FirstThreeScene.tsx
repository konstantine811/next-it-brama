import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function FirstThreeScene() {
  return (
    <h1>helow world</h1>
    /*  <Canvas
      className="border border-violet-950 rounded"
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
    </Canvas> */
  );
}
