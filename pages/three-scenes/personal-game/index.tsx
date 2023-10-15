import { Canvas } from "@react-three/fiber";
// components
import Experience from "@components/three-components/game-components/Experience";
import TrainShader from "@components/three-components/game-components/ShaderTrain";
/* import TextureMaterial from "../components/TextureMaterial";
import BoxGeometry from "../components/BoxGeometry"; */
import Light from "@components/three-components/game-components/Light";
import Ground from "@components/three-components/game-components/Ground";
import ForestModel from "@components/three-components/game-components/ForestModel";
/* import Layers from "../components/Layers"; */
import Character from "@components/three-components/game-components/Character";
/* import Wall from "../components/Wall"; */
import RagingSeaShader from "@components/three-components/game-components/RagingSeaShader";
import ParticlePlayground from "@components/three-components/game-components/ParticlePlayground/PartclePlaygound";
// trhee libs
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import {
  OrbitControls,
  OrbitControlsProps,
  /* BakeShadows, */
  /*   Stats, */
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
} from "@react-three/drei";
import { ACESFilmicToneMapping, DoubleSide, sRGBEncoding } from "three";
import { useRef, useState } from "react";
// import EventBus, { EVENT_TYPES } from "../EventBus";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";
import { useSelector } from "react-redux";
import { onHeaderHeightState } from "@/src/store/slices/commonSlice";

export default function FirstThreeScene() {
  const headerHeight = useSelector(onHeaderHeightState);
  const envFolder = 3;
  const boxFiles = [
    `/environmentMaps/${envFolder}/px.jpg`,
    `/environmentMaps/${envFolder}/nx.jpg`,
    `/environmentMaps/${envFolder}/py.jpg`,
    `/environmentMaps/${envFolder}/ny.jpg`,
    `/environmentMaps/${envFolder}/pz.jpg`,
    `/environmentMaps/${envFolder}/nz.jpg`,
  ];
  //   const hdrFile = "./environmentMaps/the_sky_is_on_fire_2k.hdr";
  const envFile = boxFiles;
  const { testing } = useControls({
    testing: true,
  });
  const [drawPoints, setDrawPoints] = useState([]);
  /*  EventBus.on(EVENT_TYPES.onClickGround, (event) => {
      setDrawPoints([event, ...drawPoints]);
    }); */

  const orbitRef = useRef<OrbitControlsImpl>(null);
  const cameraSetting = {
    fov: 45,
    near: 0.1,
    far: 1000,
    position: [3, 2, 6],
  };

  /*  const created = ({ gl, scene, camera }) => {
    // gl.setClearColor("#ff0000", 1);
    scene.background = new Color("aqua");
  }; */
  const { envEntensity, envHeight, envRadius, envScale } = useControls(
    "environment",
    {
      envEntensity: { value: 2, min: 0, max: 12 },
      envHeight: { value: 15, min: 0, max: 100 },
      envRadius: { value: 980, min: 10, max: 10000 },
      envScale: { value: 270, min: 10, max: 1000 },
    }
  );
  //   const headerHeight = useSelector(onHeaderHeightState);
  return (
    <>
      <Leva collapsed></Leva>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
        }}

        /* onCreated={created} */
      >
        {/* <BakeShadows></BakeShadows> */}
        <Environment
          background
          files={envFile} /* preset="city" */
          ground={{
            height: envHeight,
            radius: envRadius,
            scale: envScale,
          }}
        ></Environment>
        <SoftShadows size={1} samples={10}></SoftShadows>

        <AccumulativeShadows color="#ff0000" scale={100} position={[0, 0.2, 0]}>
          <RandomizedLight
            amount={8}
            radius={1}
            ambient={0.5}
            intensity={1}
            position={[1, 2, 3]}
            bias={0.001}
          />
        </AccumulativeShadows>

        <color args={["#ffffff"]} attach="background"></color>
        {/*  {testing ? <Stats showPanel={0}></Stats> : null} */}
        {testing ? <axesHelper args={[20]}></axesHelper> : null}
        {testing ? (
          <Perf style={{ top: `${headerHeight}px` }} position="top-left" />
        ) : null}
        {/* {testing ? <gridHelper args={[100, 100]}></gridHelper> : null} */}
        <Ground></Ground>
        <ForestModel /* drawPoints={drawPoints} */></ForestModel>
        <Light></Light>
        <OrbitControls makeDefault ref={orbitRef}></OrbitControls>
        {/*  <BoxGeometry orbit={orbitRef} isHelper={testing}></BoxGeometry> */}
        {/*  <Layers></Layers> */}
        <Character orbit={orbitRef}></Character>
        <Experience></Experience>
        {/*  <TrainShader></TrainShader> */}
        {/*  <RagingSeaShader></RagingSeaShader>
        <ParticlePlayground></ParticlePlayground> */}
        {/* <TextureMaterial></TextureMaterial> */}
      </Canvas>
    </>
  );
}
