/*
https://poly.pizza/m/2445qv4neDQ
Globe by jeremy [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Globe.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.globe_Circle013_1.geometry}
        material={materials["795548"]}
      />
      <mesh
        geometry={nodes.globe_Circle013_1_1.geometry}
        material={materials["455A64"]}
      />
      <mesh
        geometry={nodes.globe_Circle013_1_2.geometry}
        material={materials["039BE5"]}
      />
      <mesh
        geometry={nodes.globe_Circle013_1_3.geometry}
        material={materials["8BC34A"]}
      />
      <mesh
        geometry={nodes.globe_Circle013_1_4.geometry}
        material={materials.FFFFFF}
      />
    </group>
  );
}

useGLTF.preload("/Globe.glb");
