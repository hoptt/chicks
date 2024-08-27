/*
https://poly.pizza/m/Jw4zM0TcVo
Wood Floor by Quaternius
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/WoodWall.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Floor_Wood.geometry}
        material={materials.Atlas}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload("/WoodWall.glb");
