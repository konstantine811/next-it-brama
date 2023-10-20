import { TransformControls, useHelper } from "@react-three/drei";
import { FC, memo, useEffect, useRef, useState } from "react";
import { BoxHelper, BufferGeometry, Mesh, NormalBufferAttributes } from "three";
import type { TransformControls as TransformControlsImpl } from "three-stdlib";

interface IBoxGeometryProps {
  isHelper: boolean;
}

const BoxGeometry: FC<IBoxGeometryProps> = ({ isHelper }) => {
  const [active, setActive] = useState(false);
  const transformRef = useRef<TransformControlsImpl>(null);
  const boxRef = useRef<Mesh<BufferGeometry<NormalBufferAttributes>>>(null);
  const helper = useHelper(boxRef as any, BoxHelper, "white");
  useEffect(() => {
    if (helper && helper.current) {
      helper.current.visible = isHelper;
    }
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
};

export default memo(BoxGeometry);
