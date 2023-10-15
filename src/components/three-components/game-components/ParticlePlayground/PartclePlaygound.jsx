import BoxTwist from "./BoxTwist";
import TextureShader from "./TextureShader";
import SpherePoint from "./SpherePoint";
import CustomGeometryParticle from "./CustomGeometryParticle";

export default function ParticlePlayground() {
  return (
    <>
      <group position={[4, 2, -10]}>
        <BoxTwist></BoxTwist>
        <TextureShader></TextureShader>
        <SpherePoint></SpherePoint>
        <CustomGeometryParticle></CustomGeometryParticle>
      </group>
    </>
  );
}
