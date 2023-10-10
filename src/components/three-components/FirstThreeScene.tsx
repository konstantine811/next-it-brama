import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

export default function FirstThreeScene() {
  return (
    <Canvas
      shadows
      camera={{
        position: [-60, 70, 70],
      }}
    >
      <Experience></Experience>
    </Canvas>
  );
}
