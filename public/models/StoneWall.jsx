/*
https://poly.pizza/m/tdeAOh3LQV
Stone Wall by Quaternius
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/StoneWall.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          geometry={nodes.Wall_SecondAge_1.geometry}
          material={materials.Stone}
        />
        <mesh
          geometry={nodes.Wall_SecondAge_2.geometry}
          material={materials.Stone_Light}
        />
        <mesh
          geometry={nodes.Wall_SecondAge_3.geometry}
          material={materials.Wood}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/StoneWall.glb");
