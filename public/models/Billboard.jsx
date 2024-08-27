/*
https://poly.pizza/m/71gPkTkcnHg
Billboard by sirkitree [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Billboard.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.group176403894.geometry}
        material={materials.mat22}
      />
      <mesh
        geometry={nodes.mesh205358114.geometry}
        material={materials.mat22}
      />
      <mesh
        geometry={nodes.mesh205358114_1.geometry}
        material={materials.mat17}
      />
      <mesh
        geometry={nodes.mesh205358114_2.geometry}
        material={materials.mat21}
      />
    </group>
  );
}

useGLTF.preload("/Billboard.glb");
