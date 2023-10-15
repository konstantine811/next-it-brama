import { TransformControls, useHelper } from "@react-three/drei";
import { memo, useEffect, useRef, useState } from "react";
import { BoxHelper } from "three";

export default memo(function BoxGeometry({ isHelper }) {
  const [active, setActive] = useState(false);
  const transformRef = useRef();
  const boxRef = useRef();
  const helper = useHelper(boxRef, BoxHelper, "white");
  useEffect(() => {
    helper.current.visible = isHelper;
  });

  return (
    <TransformControls
      ref={transformRef}
      showX={active}
      showY={active}
      showZ={active}
      position-x={10}
      position-y={1}
      mode="rotate"
    >
      <mesh
        onClick={() => {
          setActive(true);
        }}
        onPointerMissed={() => {
          setActive(false);
        }}
        castShadow
        ref={boxRef}
      >
        <boxGeometry args={[2, 2, 2]}></boxGeometry>
        <meshStandardMaterial color={0x151515}></meshStandardMaterial>
      </mesh>
    </TransformControls>
  );
});
