/*
https://poly.pizza/m/8KMKYzAqWjp
Plant by Poly by Google [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Plant.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.plant.geometry} material={materials.None} />
    </group>
  );
}

useGLTF.preload("/Plant.glb");
