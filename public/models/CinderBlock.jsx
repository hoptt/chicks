/*
https://poly.pizza/m/78wlnTXRp50
Cinder block by Poly by Google [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/CinderBlock.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Box001.geometry}
        material={materials["02___Default"]}
      />
    </group>
  );
}

useGLTF.preload("/CinderBlock.glb");
