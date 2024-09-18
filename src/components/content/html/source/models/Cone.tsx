/*
https://poly.pizza/m/WoXpAJT0oD
Cone by J-Toastie [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Cone() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Cone.glb");
  return (
    <group>
      <mesh
        geometry={nodes["Cone_Cube-Mesh"].geometry}
        material={materials.Dark_gray}
      />
      <mesh
        geometry={nodes["Cone_Cube-Mesh_1"].geometry}
        material={materials.Black}
      />
      <mesh
        geometry={nodes["Cone_Cube-Mesh_2"].geometry}
        material={materials.Orange}
      />
      <mesh
        geometry={nodes["Cone_Cube-Mesh_3"].geometry}
        material={materials.White}
      />
    </group>
  );
}

useGLTF.preload("/models/Cone.glb");
