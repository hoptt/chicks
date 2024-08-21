/*
https://poly.pizza/m/03iCPYXZpJ
Pipe by CreativeTrio
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Pipe.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Pipe.geometry}
        material={materials.Diffuse_Color}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload("/Pipe.glb");
