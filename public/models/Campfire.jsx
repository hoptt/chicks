/*
https://poly.pizza/m/0vzzmM-t8CP
Campfire by Poly by Google [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Campfire.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.campfire.geometry} material={materials.None} />
    </group>
  );
}

useGLTF.preload("/Campfire.glb");
