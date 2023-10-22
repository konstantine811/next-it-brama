import { memo } from "react";

export default memo(function SpherePoint() {
  return (
    <>
      <points>
        <sphereGeometry args={[1, 48, 48]}></sphereGeometry>
        <pointsMaterial
          color="red"
          size={0.015}
          sizeAttenuation
        ></pointsMaterial>
      </points>
    </>
  );
});
