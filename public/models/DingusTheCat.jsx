/*
https://poly.pizza/m/4dXgbKLHD9
Dingus the cat by alwayshasbean [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/DingusTheCat.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Maxwell.geometry}
        material={materials.Dingus}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        geometry={nodes.whiskers.geometry}
        material={materials.Whiskers}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload("/DingusTheCat.glb");
