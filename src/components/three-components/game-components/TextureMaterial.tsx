import { useLoader } from "@react-three/fiber";
import { RepeatWrapping, TextureLoader } from "three";

export default function TextureMaterial() {
  const [
    colorMap,
    displacementMap,
    normalMap,
    roughnessMap,
    aoMap,
    metalnessMap,
  ] = useLoader(TextureLoader, [
    "/texture/Concrete/Concrete043C_1K_Color.jpg",
    "/texture/Concrete/Concrete043C_1K_Displacement.jpg",
    "/texture/Concrete/Concrete043C_1K_NormalGL.jpg",
    "/texture/Concrete/Concrete043C_1K_Roughness.jpg",
    "/texture/Concrete/Concrete043C_1K_AmbientOcclusion.jpg",
    "/texture/Concrete/Concrete043C_1K_Metalness.jpg",
  ]);
  const repeat = [3.25, 3.25];
  colorMap.repeat.set(repeat[0], repeat[1]);
  colorMap.wrapS = RepeatWrapping;
  colorMap.wrapT = RepeatWrapping;
  displacementMap.repeat.set(repeat[0], repeat[1]);
  displacementMap.wrapS = RepeatWrapping;
  displacementMap.wrapT = RepeatWrapping;
  normalMap.repeat.set(repeat[0], repeat[1]);
  normalMap.wrapS = RepeatWrapping;
  normalMap.wrapT = RepeatWrapping;
  roughnessMap.repeat.set(repeat[0], repeat[1]);
  roughnessMap.wrapS = RepeatWrapping;
  roughnessMap.wrapT = RepeatWrapping;
  aoMap.repeat.set(repeat[0], repeat[1]);
  aoMap.wrapS = RepeatWrapping;
  aoMap.wrapT = RepeatWrapping;
  metalnessMap.repeat.set(repeat[0], repeat[1]);
  metalnessMap.wrapS = RepeatWrapping;
  metalnessMap.wrapT = RepeatWrapping;
  return (
    <>
      <mesh castShadow position={[5, 3, 1]}>
        <sphereGeometry args={[2.5, 264, 264]}></sphereGeometry>
        <meshStandardMaterial
          map={colorMap}
          displacementScale={0.07}
          displacementMap={displacementMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
          metalnessMap={metalnessMap}
          wireframe={false}
        ></meshStandardMaterial>
      </mesh>
    </>
  );
}
