/*
https://poly.pizza/m/L4E32Wee6C
Wood Log by Quaternius
*/

import { useGLTF } from "@react-three/drei";

export function Log2() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Log2.glb");
  return (
    <group rotation={[-Math.PI / 2, 0, -0.67]} scale={198.943}>
      <mesh geometry={nodes.WoodLog_1.geometry} material={materials.Wood} />
      <mesh
        geometry={nodes.WoodLog_2.geometry}
        material={materials.LightWood}
      />
    </group>
  );
}
