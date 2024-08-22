/*
https://poly.pizza/m/8xHS2Js0MA_
Lily pad by Poly by Google [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Lilypad.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.lily_pad.geometry} material={materials.None} />
    </group>
  );
}

useGLTF.preload("/Lilypad.glb");
