import { MeshReflectorMaterial } from "@react-three/drei";
import { memo, useState } from "react";
import { DoubleSide } from "three";
// import EventBus, { EVENT_TYPES } from "../EventBus";
import { useControls } from "leva";

export default memo(function Ground({ envEntensity }) {
  const [pointer, setPointer] = useState();
  const { groundColor } = useControls("ground", {
    groundColor: "#0c4810",
  });

  return (
    <>
      <mesh
        onPointerMove={(event) => {
          setPointer(event.point);
        }}
        receiveShadow
        rotation-x={-Math.PI / 2}
      >
        <planeGeometry args={[100, 100, 1, 1]}></planeGeometry>
        {/*  <meshStandardMaterial color={0xffffff}></meshStandardMaterial> */}
        {/*  <MeshReflectorMaterial
          resolution={512}
           blur={[1000, 1000]}
          mixBlur={1}
          mirror={1}
        ></MeshReflectorMaterial> */}
        <meshStandardMaterial
          envMapIntensity={envEntensity}
          color={groundColor}
          side={DoubleSide}
          receiveShadow
        ></meshStandardMaterial>
      </mesh>
      {pointer ? (
        <mesh
          position={[pointer.x, pointer.y + 0.1, pointer.z]}
          rotation-x={-Math.PI * 0.5}
          onClick={(event) => {
            /*  EventBus.emit(EVENT_TYPES.onClickGround, event.point); */
          }}
        >
          <planeGeometry args={[0.5, 0.5, 1, 1]}></planeGeometry>
          <meshStandardMaterial
            transparent
            opacity={0.5}
            color={0xff0000}
            side={DoubleSide}
          ></meshStandardMaterial>
        </mesh>
      ) : null}
    </>
  );
});
