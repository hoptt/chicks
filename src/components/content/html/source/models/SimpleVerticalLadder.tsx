/*
https://poly.pizza/m/8JKJ19ZGyiE
Simple Vertical Ladder by Jarlan Perez [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function SimpleVerticalLadder() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/SimpleVerticalLadder.glb"
  );
  return (
    <group>
      <mesh geometry={nodes.Node.geometry} material={materials.mat18} />
    </group>
  );
}
