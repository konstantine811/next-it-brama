import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { FC, RefObject, memo, useEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";
import { UserInput } from "@hookds/userInput";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
  materials: {};
};

let walkDirection = new Vector3();
let rotateAngle = new Vector3(0, 1, 0);
let rotateQuarternion = new Quaternion();
let cameraTarget = new Vector3();

interface ICharacterProps {
  orbit: RefObject<OrbitControlsImpl>;
}

const directionOffset = (
  forward: boolean,
  backward: boolean,
  left: boolean,
  right: boolean
) => {
  let directionOffset = 0; // w
  if (forward) {
    if (left) {
      directionOffset = Math.PI / 4; // w+a
    } else if (right) {
      directionOffset = -Math.PI / 4; // w + d
    }
  } else if (backward) {
    if (left) {
      directionOffset = Math.PI / 4 + Math.PI / 2; // s+a
    } else if (right) {
      directionOffset = -Math.PI / 4 - Math.PI / 2; // s + d
    } else {
      directionOffset = Math.PI; // s
    }
  } else if (left) {
    directionOffset = Math.PI / 2; // a
  } else if (right) {
    directionOffset = -Math.PI / 2; // d
  }

  return directionOffset;
};

const Character: FC<ICharacterProps> = ({ orbit }) => {
  const { backward, forward, left, right, shift, jump } = UserInput();
  const model = useGLTF("/models/children.glb") as GLTFResult;
  useEffect(() => {
    Object.values(model.nodes).forEach((i) => {
      if (i.type === "SkinnedMesh") {
        i.castShadow = true;
      }
    });
  }, [model]);

  const { actions } = useAnimations(model.animations, model.scene);
  actions?.idle?.play();
  const camera = useThree((state) => state.camera);
  const currentAction = useRef("");

  const updateCameraTarget = (moveX: number, moveZ: number) => {
    // move camera
    camera.position.x += moveX;
    camera.position.z += moveZ;

    // update camera target
    cameraTarget.x = model.scene.position.x;
    cameraTarget.y = model.scene.position.y + 2;
    cameraTarget.z = model.scene.position.z;
    if (orbit?.current) {
      orbit.current.target = cameraTarget;
    }
  };
  useFrame((state, delta) => {
    if (
      currentAction.current === "walking" ||
      currentAction.current === "run"
    ) {
      // calculate towards camera direction
      let angleYCameraDirecation = Math.atan2(
        camera.position.x - model.scene.position.x,
        camera.position.z - model.scene.position.z
      );
      let newDirectionOffset = directionOffset(forward, backward, left, right);
      // rotate model
      rotateQuarternion.setFromAxisAngle(
        rotateAngle,
        angleYCameraDirecation + newDirectionOffset
      );
      model.scene.quaternion.rotateTowards(rotateQuarternion, 0.2);
      // calculate direction
      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);
      // run/walk velocity
      const velocity = currentAction.current === "run" ? 15 : 3;
      // move model camera
      const moveX = walkDirection.x * velocity * delta;
      const moveZ = walkDirection.z * velocity * delta;
      model.scene.position.x += moveX;
      model.scene.position.z += moveZ;
      updateCameraTarget(moveX, moveZ);
    }
  });
  useEffect(() => {
    let action = "";
    if (forward || backward || left || right) {
      action = "walking";
      if (shift) {
        action = "run";
      }
    } else if (jump) {
      action = "jump";
    } else {
      action = "idle";
    }

    if (currentAction.current !== action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextActionToPlay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }
  }, [backward, forward, left, right, shift, jump, actions]);
  return (
    <>
      <group position-x={0.3}>
        <primitive object={model.scene}></primitive>
      </group>
    </>
  );
};

export default memo(Character);
