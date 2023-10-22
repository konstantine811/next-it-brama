import React, { useEffect, useState, memo, FC } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
  materials: {};
};

interface IForestModelProps {
  boundary?: number;
  count?: number;
  drawPoints?: number[][];
}

interface ITempTrees {
  position: ITreePosition;
  box: number;
}

interface ITreePosition {
  x: number;
  z: number;
}

const ForestModel: FC<IForestModelProps> = ({
  boundary,
  count,
  drawPoints,
}) => {
  const { nodes, materials } = useGLTF("/models/tree.glb") as GLTFResult;
  const [trees, setTrees] = useState<ITempTrees[]>([]);

  const newPosition = (box: number, boundary: number) => {
    return (
      boundary / 2 -
      box / 2 -
      (boundary - box) * (Math.round(Math.random() * 100) / 100)
    );
  };

  const boxIntersect = (
    minAx: number,
    minAz: number,
    maxAx: number,
    maxAz: number,
    minBx: number,
    minBz: number,
    maxBx: number,
    maxBz: number
  ) => {
    let aLeftOfB = maxAx < minBx;
    let aRightOfB = minAx > maxBx;
    let aAboveB = minAz > maxBz;
    let aBelowB = maxAz < minBz;
    return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
  };

  useEffect(() => {
    const updatePosition = (treeArray: ITempTrees[], boundary: number) => {
      treeArray.forEach((tree, index) => {
        do {
          tree.position.x = newPosition(tree.box, boundary);
          tree.position.z = newPosition(tree.box, boundary);
        } while (isOverlapping(index, tree, treeArray));
      });
      setTrees(treeArray);
    };
    const isOverlapping = (
      index: number,
      tree: ITempTrees,
      trees: ITempTrees[]
    ) => {
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
    if (drawPoints) {
      const trees = drawPoints.map((vector, index) => {
        const tempTrees: ITempTrees = {
          position: {
            x: vector[0],
            z: vector[1],
          },
          box: index,
        };
        return tempTrees;
      });
      setTrees(trees);
    } else {
      if (boundary && count) {
        const setTreesPosition = () => {
          const tempTrees: ITempTrees[] = [];
          for (let i = 0; i < count; i++) {
            tempTrees.push({
              position: { x: 0, z: 0 },
              box: 1,
            });
          }
          updatePosition(tempTrees, boundary);
        };
        setTreesPosition();
      }
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
              geometry={(nodes as any).tree040.geometry}
              material={(materials as any).Bark}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={(nodes as any).leaves035.geometry}
                material={(materials as any).Leaves}
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
};

useGLTF.preload("/models/tree.glb");

export default memo(ForestModel);
