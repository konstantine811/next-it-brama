import { DoubleSide } from "three";
import { useMemo, useRef, useEffect, memo } from "react";

export default memo(function CustomObject() {
  const verticesCount = 10 * 3;
  const geometryRef = useRef();

  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);
    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }
    return positions;
  }, [verticesCount]);
  useEffect(() => {
    geometryRef.current.computeVertexNormals();
  }, [geometryRef]);
  return (
    <mesh position-x="-1">
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={verticesCount}
          itemSize={3}
          array={positions}
        ></bufferAttribute>
      </bufferGeometry>
      <meshBasicMaterial side={DoubleSide} color="red"></meshBasicMaterial>
    </mesh>
  );
});
