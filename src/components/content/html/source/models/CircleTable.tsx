/*
https://poly.pizza/m/8RW134iS2gW
Table by jeremy [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function CircleTable() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/CircleTable.glb"
  );

  return (
    <group scale={0.05}>
      <mesh
        geometry={nodes.Table_Small_Circular_01_Circle009.geometry}
        material={materials["795548"]}
        receiveShadow
      />
    </group>
  );
}
