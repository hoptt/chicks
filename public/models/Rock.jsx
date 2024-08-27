/*
https://poly.pizza/m/RtLRqYjfMs
Rock by Quaternius
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Rock.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Resource_Rock_1.geometry}
        material={materials.Stone}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload("/Rock.glb");
