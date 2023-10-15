import React, { useEffect, useState, memo } from "react";
import { BakeShadows, useGLTF } from "@react-three/drei";

export default memo(function Model({ boundary, count, drawPoints }) {
  const { nodes, materials } = useGLTF("/models/tree.glb");
  const [trees, setTrees] = useState([]);

  const newPosition = (box, boundary) => {
    return (
      boundary / 2 -
      box / 2 -
      (boundary - box) * (Math.round(Math.random() * 100) / 100)
    );
  };

  const setTreesPosition = () => {
    const tempTrees = [];
    for (let i = 0; i < count; i++) {
      tempTrees.push({
        position: { x: 0, z: 0 },
        box: 1,
      });
    }
    updatePosition(tempTrees, boundary);
  };

  const updatePosition = (treeArray, boundary) => {
    treeArray.forEach((tree, index) => {
      do {
        tree.position.x = newPosition(tree.box, boundary);
        tree.position.z = newPosition(tree.box, boundary);
      } while (isOverlapping(index, tree, treeArray));
    });
    setTrees(treeArray);
  };

  const isOverlapping = (index, tree, trees) => {
    const minTargetX = tree.position.x - tree.box / 2;
    const maxTargetX = tree.position.x + tree.box / 2;
    const minTargetZ = tree.position.z - tree.box / 2;
    const maxTargetZ = tree.position.z + tree.box / 2;
    for (let i = 0; i < index; i++) {
      let minChildX = trees[i].position.x - trees[i].box / 2;
      let maxChildX = trees[i].position.x + trees[i].box / 2;
      let minChildZ = trees[i].position.z - trees[i].box / 2;
      let maxChildZ = trees[i].position.z + trees[i].box / 2;
      if (
        boxIntersect(
          minTargetX,
          minTargetZ,
          maxTargetX,
          maxTargetZ,
          minChildX,
          minChildZ,
          maxChildX,
          maxChildZ
        )
      ) {
        // console.log("Content box is overlapping! ", tree.position);
        return true;
      }
    }
    return false;
  };

  const boxIntersect = (
    minAx,
    minAz,
    maxAx,
    maxAz,
    minBx,
    minBz,
    maxBx,
    maxBz
  ) => {
    let aLeftOfB = maxAx < minBx;
    let aRightOfB = minAx > maxBx;
    let aAboveB = minAz > maxBz;
    let aBelowB = maxAz < minBz;
    return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
  };

  useEffect(() => {
    if (drawPoints) {
      const trees = drawPoints.map((vector, index) => {
        return {
          position: vector,
          box: index,
        };
      });
      setTrees(trees);
    } else {
      setTreesPosition();
    }
  }, [boundary, count, drawPoints]);

  return (
    <>
      {trees.map((tree, index) => {
        return (
          <group key={index} position={[tree.position.x, 0, tree.position.z]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.tree040.geometry}
              material={materials.Bark}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.leaves035.geometry}
                material={materials.Leaves}
              />
            </mesh>
            <mesh>
              <boxGeometry></boxGeometry>
              <meshBasicMaterial color={"red"} wireframe></meshBasicMaterial>
            </mesh>
          </group>
        );
      })}
    </>
  );
});

useGLTF.preload("/models/tree.glb");
