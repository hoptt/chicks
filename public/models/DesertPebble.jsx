/*
https://poly.pizza/m/fqhwoqMd8A-
Desert pebble by Leigh Garland [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/DesertPebble.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.group536976416.geometry}
        material={materials.mat18}
      />
    </group>
  );
}

useGLTF.preload("/DesertPebble.glb");
