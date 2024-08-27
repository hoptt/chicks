/*
https://poly.pizza/m/3QLOU0uIv0q
Plate by Zoe XR [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Plate.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.group1515085826.geometry}
        material={materials.mat21}
      />
    </group>
  );
}

useGLTF.preload("/Plate.glb");
