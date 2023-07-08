import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { DoubleSide } from "three";
import { Perf } from "r3f-perf";
import { useSelector } from "react-redux";
import { onHeaderHeightState } from "@/slices/commonSlice";

export default function FirstThreeScene() {
  const headerHeight = useSelector(onHeaderHeightState);
  return (
    <Canvas
      shadows
      camera={{
        position: [-60, 70, 70],
      }}
    >
      <Perf style={{ top: `${headerHeight}px` }} position="top-left" />
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
