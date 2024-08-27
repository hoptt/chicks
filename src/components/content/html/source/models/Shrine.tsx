/*
https://poly.pizza/m/tFxdxO5clk
Shrine by Kay Lousberg
*/

import { useGLTF } from "@react-three/drei";

export function Shrine() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Shrine.glb");
  return (
    <group>
      <mesh
        geometry={nodes.shrine.geometry}
        material={materials.HalloweenBits}
        scale={100}
      />
    </group>
  );
}
