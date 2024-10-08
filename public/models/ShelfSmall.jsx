/*
https://poly.pizza/m/TfdgUV2RYe
Shelf Small by Quaternius
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/ShelfSmall.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Shelf_Small2.geometry}
        material={materials.White}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload("/ShelfSmall.glb");
