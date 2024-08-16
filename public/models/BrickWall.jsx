/*
https://poly.pizza/m/fMW51aYE5Hp
Brick wall by Poly by Google [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function BrickWall(props) {
  const { nodes, materials } = useGLTF("/BrickWall.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.pCube102.geometry} material={materials.blinn3SG} />
    </group>
  );
}

useGLTF.preload("/BrickWall.glb");
