/*
https://poly.pizza/m/aH83BlSFxJu
Candle by Poly by Google [CC-BY] via Poly Pizza
*/

import { Text3D, useGLTF } from "@react-three/drei";
const fontUrl = "/fonts/Pretendard.json";
const fontStyle = {
  font: fontUrl,
  size: 0.08,
  letterSpacing: 0.01,
  height: 0.01,
  bevelEnabled: true,
  bevelOffset: 0.003,
  bevelSize: 0.001,
  bevelThickness: 0.001,
};
export function Candle() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Candle.glb");
  return (
    <group position={[10.51, 2.9, -23.1]} scale={2.5}>
      <mesh
        geometry={nodes.Cylinder001_Cylinder002.geometry}
        material={materials.phong1SG}
      />
      <Text3D
        {...(fontStyle as any)}
        rotation={[0, 0.7, 0]}
        position={[-0.05, 0.12, 0.05]}
      >
        24
        <meshBasicMaterial color={"#98ae47"} />
      </Text3D>
    </group>
  );
}

useGLTF.preload("/models/Candle.glb");
