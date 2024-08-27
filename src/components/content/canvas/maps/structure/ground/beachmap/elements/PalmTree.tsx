/*
https://poly.pizza/m/bjGeBbKhAVN
Palm tree by jeremy [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function PalmTree() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/PalmTree.glb"
  );
  return (
    <group position={[15, 1, 8]} scale={0.03}>
      <mesh
        geometry={nodes["palm_tree_01-Mesh"].geometry}
        material={materials["795548"]}
      />
      <mesh
        geometry={nodes["palm_tree_01-Mesh_1"].geometry}
        material={materials["8BC34A"]}
        castShadow
      />
      <mesh
        geometry={nodes["palm_tree_01-Mesh_2"].geometry}
        material={materials.DD9944}
        castShadow
      />
    </group>
  );
}

useGLTF.preload("/models/PalmTree.glb");
