/*
https://poly.pizza/m/2DgM36qZW2u
Crab by Poly by Google [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Crab.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Geo_Crab.geometry}
        material={materials.lambert2SG}
      />
    </group>
  );
}

useGLTF.preload("/Crab.glb");
