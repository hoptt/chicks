/*
https://poly.pizza/m/2WvdDP8C3a5
Cake by Poly by Google [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Cake.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.pCylinder30_1.geometry}
        material={materials.blinn6SG}
      />
      <mesh
        geometry={nodes.pCylinder30_1_1.geometry}
        material={materials.blinn10SG}
      />
      <mesh
        geometry={nodes.pCylinder30_1_2.geometry}
        material={materials.blinn8SG}
      />
    </group>
  );
}

useGLTF.preload("/Cake.glb");
