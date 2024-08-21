/*
https://poly.pizza/m/9TN4PyhWvz1
Beach chair by Poly by Google [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/BeachChair.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Beach_Chair.geometry}
        material={materials.lambert3SG}
      />
    </group>
  );
}

useGLTF.preload("/BeachChair.glb");
