/*
https://poly.pizza/m/19VoUuA2pcN
Bicycle by Poly by Google [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Bicycle.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Bike_mesh.geometry}
        material={materials.Bike_mat1}
      />
    </group>
  );
}

useGLTF.preload("/Bicycle.glb");
