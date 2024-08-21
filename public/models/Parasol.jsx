/*
https://poly.pizza/m/FLEbO2jluO
Parasol by Zsky [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Parasol.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Parasol1_1.geometry}
        material={materials.WoodParasol1}
      />
      <mesh
        geometry={nodes.Parasol1_2.geometry}
        material={materials.Parasol1}
      />
    </group>
  );
}

useGLTF.preload("/Parasol.glb");
