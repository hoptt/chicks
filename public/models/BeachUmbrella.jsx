/*
https://poly.pizza/m/936irBEUnpu
Beach umbrella by Poly by Google [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/BeachUmbrella.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Beach_Umbrella_1.geometry}
        material={materials.lambert3SG}
      />
      <mesh
        geometry={nodes.Beach_Umbrella_1_1.geometry}
        material={materials.lambert5SG}
      />
    </group>
  );
}

useGLTF.preload("/BeachUmbrella.glb");
