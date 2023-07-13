import { Center, OrbitControls, Text3D } from "@react-three/drei";
import { DoubleSide } from "three";
import { Perf } from "r3f-perf";
import { useSelector } from "react-redux";
import { onHeaderHeightState } from "@/slices/commonSlice";

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
        <Text3D size={10} font="./fonts/Nunito_ExtraLight_Regular.json">
          Hello world
          <meshNormalMaterial></meshNormalMaterial>
        </Text3D>
      </Center>
    </>
  );
};

export default Experience;
