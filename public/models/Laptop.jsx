/*
https://poly.pizza/m/WMW4C2J021
Laptop by J-Toastie [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Laptop.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.laptop.geometry}
        material={materials.laptop_albedo}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload("/Laptop.glb");
