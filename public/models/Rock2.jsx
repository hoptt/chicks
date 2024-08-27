/*
https://poly.pizza/m/fM90QFMNtS
Rock by Zsky [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Rock2.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Rock4.geometry} material={materials.Rock4} />
    </group>
  );
}

useGLTF.preload("/Rock2.glb");
