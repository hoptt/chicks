/*
https://poly.pizza/m/8JKJ19ZGyiE
Simple Vertical Ladder by Jarlan Perez [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Ladder() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/SimpleVerticalLadder.glb"
  );
  return (
    <group position={[-11.5, 3, 4]} rotation={[1.3, -1, 1.5]}>
      <mesh geometry={nodes.Node.geometry} material={materials.mat18} />
    </group>
  );
}

useGLTF.preload("/models/SimpleVerticalLadder.glb");
