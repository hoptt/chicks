/*
https://poly.pizza/m/56XYDxnVVM3
Booombox by Poly by Google [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/BooomBox.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes["Boombox_Circle002-Mesh"].geometry}
        material={materials.FF5722}
      />
      <mesh
        geometry={nodes["Boombox_Circle002-Mesh_1"].geometry}
        material={materials.FFFFFF}
      />
      <mesh
        geometry={nodes["Boombox_Circle002-Mesh_2"].geometry}
        material={materials["1A1A1A"]}
      />
    </group>
  );
}

useGLTF.preload("/BooomBox.glb");
