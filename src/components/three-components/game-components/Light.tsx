import { Sky, useHelper } from "@react-three/drei";
import { useControls } from "leva";
import { FC, memo, useEffect, useRef } from "react";
import { DirectionalLightHelper, DirectionalLight } from "three";

interface ILightProps {
  isHelper?: boolean;
}

const Light: FC<ILightProps> = ({ isHelper = false }) => {
  const directLightRef = useRef<DirectionalLight>(null);
  const shadowWidth = 1;
  const shadowSize = 1024 * 2;
  const helper = useHelper(
    directLightRef as any,
    DirectionalLightHelper,
    5,
    "red"
  );
  useEffect(() => {
    if (helper && helper.current) {
      helper.current.visible = isHelper;
    }
  });

  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [-0.9, 10, -5] },
  });
  return (
    <>
      {/*  <Sky sunPosition={sunPosition}></Sky> */}
      {/*  <ambientLight intensity={0.2}></ambientLight> */}
      <directionalLight
        castShadow
        ref={directLightRef}
        shadow-mapSize={[shadowSize, shadowSize]}
        shadow-camera-near={1}
        shadow-camera-far={shadowWidth}
        shadow-camera-left={-shadowWidth}
        shadow-camera-right={shadowWidth}
        shadow-camera-bottom={-shadowWidth}
        shadow-camera-top={shadowWidth}
        position={sunPosition}
        color={0xffffff}
        intensity={3}
      ></directionalLight>
    </>
  );
};

export default memo(Light);
