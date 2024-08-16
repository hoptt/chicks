/*
https://poly.pizza/m/6pwiq7hSrHr
Tree by Poly by Google [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Tree.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.tree01.geometry} material={materials.Mat} />
    </group>
  );
}

useGLTF.preload("/Tree.glb");
