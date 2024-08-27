/*
https://poly.pizza/m/tFxdxO5clk
Shrine by Kay Lousberg
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Shrine.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.shrine.geometry}
        material={materials.HalloweenBits}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload("/Shrine.glb");
