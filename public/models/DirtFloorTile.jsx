/*
https://poly.pizza/m/F0ZVJsCnI3
Dirt Floor Tile by Kay Lousberg
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/DirtFloorTile.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.floor_dirt.geometry}
        material={materials.HalloweenBits}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload("/DirtFloorTile.glb");
