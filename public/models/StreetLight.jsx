/*
https://poly.pizza/m/nFwrlcLvM5
Street Light by Quaternius
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/StreetLight.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={58.6}>
        <mesh
          geometry={nodes.StreetLight_1.geometry}
          material={materials.Grey}
        />
        <mesh
          geometry={nodes.StreetLight_2.geometry}
          material={materials.Light}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/StreetLight.glb");
