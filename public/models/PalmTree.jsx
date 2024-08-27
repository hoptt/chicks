/*
https://poly.pizza/m/bjGeBbKhAVN
Palm tree by jeremy [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/PalmTree.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes["palm_tree_01-Mesh"].geometry}
        material={materials["795548"]}
      />
      <mesh
        geometry={nodes["palm_tree_01-Mesh_1"].geometry}
        material={materials["8BC34A"]}
      />
      <mesh
        geometry={nodes["palm_tree_01-Mesh_2"].geometry}
        material={materials.DD9944}
      />
    </group>
  );
}

useGLTF.preload("/PalmTree.glb");
