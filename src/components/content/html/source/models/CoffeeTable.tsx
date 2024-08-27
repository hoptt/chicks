/*
https://poly.pizza/m/dP74Xz2DlMe
Coffee Table by Francisco Hui [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function CoffeeTable() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/CoffeeTable.glb"
  );
  return (
    <group scale={0.5}>
      <mesh geometry={nodes["Node-Mesh"].geometry} material={materials.mat23} />
      <mesh
        geometry={nodes["Node-Mesh_1"].geometry}
        material={materials.mat24}
      />
    </group>
  );
}
