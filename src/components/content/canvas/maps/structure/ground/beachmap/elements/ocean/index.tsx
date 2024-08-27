import { useTexture } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { RepeatWrapping, PlaneGeometry, Vector3 } from "three";
import { Water } from "three-stdlib";
extend({ Water });
export function Ocean() {
  const ref = useRef<any>();
  const gl: any = useThree((state) => state.gl);
  const waterNormals = useTexture("/textures/floor/water.jpg");
  waterNormals.wrapS = waterNormals.wrapT = RepeatWrapping;
  const geom = useMemo(() => new PlaneGeometry(100, 80), []);
  const config = useMemo(
    () => ({
      textureWidth: 1024,
      textureHeight: 1024,
      waterNormals,
      sunDirection: new Vector3(),
      sunColor: 0xffffff,
      waterColor: "#0b152c",
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
    <group position={[0, 0.25, -50]}>
      <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
      {/* <pointLight args={["#068e3f", 5, 3, 1]} position={[-7, -0.5, 1]} /> */}
    </group>
  );
}

useTexture.preload("/textures/floor/water.jpg");
