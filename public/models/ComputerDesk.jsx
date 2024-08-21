/*
https://poly.pizza/m/OhXey2fljr
Computer Desk by Zsky [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/ComputerDesk.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.ComputerDesk1.geometry}
        material={materials.MetalComputerDesk1}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload("/ComputerDesk.glb");
