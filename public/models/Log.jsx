/*
https://poly.pizza/m/dkRLlPSdgdR
Log by Poly by Google [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Log.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.log.geometry} material={materials.None} />
    </group>
  );
}

useGLTF.preload("/Log.glb");
