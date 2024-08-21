/*
https://poly.pizza/m/5KohLH0xc8d
Air conditioner by Poly by Google [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/AirConditioner.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Air_Conditioner1.geometry}
        material={materials.lambert3SG}
      />
    </group>
  );
}

useGLTF.preload("/AirConditioner.glb");
