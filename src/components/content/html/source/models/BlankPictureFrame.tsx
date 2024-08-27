/*
https://poly.pizza/m/89xZIizrRZ0
Blank Picture Frame by Jarlan Perez [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function BlankPictureFrame() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/BlankPictureFrame.glb"
  );
  return (
    <group rotation={[-1.5, 3, 1]}>
      <mesh geometry={nodes["Node-Mesh"].geometry} material={materials.mat21} />
      <mesh
        geometry={nodes["Node-Mesh_1"].geometry}
        material={materials.mat22}
      />
      <mesh
        geometry={nodes["Node-Mesh_2"].geometry}
        material={materials.mat15}
      />
      <mesh
        geometry={nodes["Node-Mesh_3"].geometry}
        material={materials.mat24}
      />
    </group>
  );
}
