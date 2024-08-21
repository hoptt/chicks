/*
https://poly.pizza/m/2olZ0G8iur
Mailbox by CreativeTrio
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Mailbox.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Mailbox.geometry}
        material={materials.Material}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload("/Mailbox.glb");
