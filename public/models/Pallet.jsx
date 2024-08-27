/*
https://poly.pizza/m/cUAsYHDqfD
Pallet by Quaternius
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Pallet.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Pallet.geometry}
        material={materials.Wood}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[9.346, 88.942, 9.614]}
      />
    </group>
  );
}

useGLTF.preload("/Pallet.glb");
