/*
https://poly.pizza/m/3QLOU0uIv0q
Plate by Zoe XR [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Plate() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Plate.glb");
  return (
    <group>
      <mesh
        geometry={nodes.group1515085826.geometry}
        material={materials.mat21}
      />
    </group>
  );
}
