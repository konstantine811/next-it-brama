import { memo, useEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";

const BoxTwist = () => {
  const meshRef = useRef();
  const quaternion = new Quaternion();

  useEffect(() => {
    const currentPositon = meshRef.current.geometry.attributes.position;
    const originalPosition = currentPositon.clone();
    const originalPositionArray = originalPosition?.array || [];

    for (let i = 0; i < originalPositionArray.length; i = i + 3) {
      const modifiedPositionVector = new Vector3(
        originalPositionArray[i],
        originalPositionArray[i + 1],
        originalPositionArray[i + 2]
      );
      const upVector = new Vector3(0, 1, 0);

      // Rotate along the y axis (0, 1, 0);
      quaternion.setFromAxisAngle(
        upVector,
        (Math.PI / 180) * (modifiedPositionVector.y + 10) * 100
      ); // the higher along the y axis the vertex is, the more we rotate
      modifiedPositionVector.applyQuaternion(quaternion);
      currentPositon.array[i] = modifiedPositionVector.x;
      currentPositon.array[i + 1] = modifiedPositionVector.y;
      currentPositon.array[i + 2] = modifiedPositionVector.z;
    }
    currentPositon.needsUpdate = true;
  });
  return (
    <>
      <mesh position={[3, 0, 0]} ref={meshRef}>
        <boxGeometry args={[1, 1, 1, 10, 10, 10]}></boxGeometry>
        <meshLambertMaterial
          color="hotpink"
          emissive="hotpink"
        ></meshLambertMaterial>
      </mesh>
    </>
  );
};

export default memo(BoxTwist);
