import { Center, OrbitControls, Text3D } from "@react-three/drei";
import { DoubleSide } from "three";
import { Perf } from "r3f-perf";
import { useSelector } from "react-redux";
import { onHeaderHeightState } from "@store/slices/commonSlice";
import NunitoFont from "@/public/fonts/Nunito_ExtraLight_Regular.json";

const Experience = () => {
  const headerHeight = useSelector(onHeaderHeightState);
  return (
    <>
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
      <Center position={[0, 15, 0]}>
        <Text3D
          size={10}
          height={1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.2}
          bevelSize={0.3}
          bevelOffset={0}
          bevelSegments={5}
          font={NunitoFont as any}
        >
          Hello world
          <meshNormalMaterial></meshNormalMaterial>
        </Text3D>
      </Center>
    </>
  );
};

export default Experience;
