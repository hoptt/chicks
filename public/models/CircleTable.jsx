/*
https://poly.pizza/m/8RW134iS2gW
Table by jeremy [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function CircleTable(props) {
  const { nodes, materials } = useGLTF("/CircleTable.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Table_Small_Circular_01_Circle009.geometry}
        material={materials["795548"]}
      />
    </group>
  );
}

useGLTF.preload("/CircleTable.glb");
