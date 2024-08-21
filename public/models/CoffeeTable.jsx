/*
https://poly.pizza/m/dP74Xz2DlMe
Coffee Table by Francisco Hui [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/CoffeeTable.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes["Node-Mesh"].geometry} material={materials.mat23} />
      <mesh
        geometry={nodes["Node-Mesh_1"].geometry}
        material={materials.mat24}
      />
    </group>
  );
}

useGLTF.preload("/CoffeeTable.glb");
