/*
https://poly.pizza/m/Mm4RMgwNO8
Pebble Square by Quaternius
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/PebbleSquare.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Pebble_Square_2.geometry}
        material={materials.PathRocks}
      />
    </group>
  );
}

useGLTF.preload("/PebbleSquare.glb");
