/*
https://poly.pizza/m/8JKJ19ZGyiE
Simple Vertical Ladder by Jarlan Perez [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/SimpleVerticalLadder.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Node.geometry} material={materials.mat18} />
    </group>
  );
}

useGLTF.preload("/SimpleVerticalLadder.glb");
