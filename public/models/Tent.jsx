/*
https://poly.pizza/m/2tvQrMLf_tP
Tent by Jarlan Perez [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Tent.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes["Node-Mesh"].geometry} material={materials.mat9} />
      <mesh
        geometry={nodes["Node-Mesh_1"].geometry}
        material={materials.mat20}
      />
    </group>
  );
}

useGLTF.preload("/Tent.glb");
