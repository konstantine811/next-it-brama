import { useAnimations, useGLTF } from "@react-three/drei";
import { memo, useEffect } from "react";

export default memo(function Layers() {
  const model = useGLTF("/models/layers.glb");

  const { actions } = useAnimations(model.animations, model.scene);
  useEffect(() => {
    actions?.swiming_top?.play();
    actions?.swiming_middle?.play();
    actions?.swiming_bottom?.play();
  }, []);
  return (
    <>
      <group position-z={-10.3}>
        <primitive object={model.scene}></primitive>
      </group>
    </>
  );
});
