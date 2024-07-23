import { useHelper, useTexture } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { RectAreaLightHelper, Water } from "three-stdlib";
extend({ Water });
export function Ponds() {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useTexture("/textures/floor/water.jpg");
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const lightRef = useRef();
  useHelper(lightRef, THREE.PointLightHelper, 1, "yellow");
  const geom = useMemo(() => new THREE.PlaneGeometry(30, 7), []);
  const config = useMemo(
    () => ({
      textureWidth: 1024,
      textureHeight: 1024,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 0.5,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals]
  );
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.material.uniforms.time.value += delta / 10;
  });
  return (
    <group position={[0, 0.5, -17]}>
      <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
      <pointLight
        ref={lightRef}
        args={["#068e3f", 5, 3, 1]}
        // position-y={2}
        position={[-7, -0.5, 1]}
        // castShadow
      />
    </group>
  );
}
