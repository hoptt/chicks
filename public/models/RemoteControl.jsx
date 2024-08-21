/*
https://poly.pizza/m/1WeIJuIuMZz
Remote control by Poly by Google [CC-BY] via Poly Pizza
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/RemoteControl.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Text001.geometry}
        material={materials["19___Default"]}
      />
      <mesh
        geometry={nodes.Box001_1.geometry}
        material={materials["07___Default"]}
      />
      <mesh
        geometry={nodes.Box001_1_1.geometry}
        material={materials["19___Default"]}
      />
      <mesh
        geometry={nodes.Box001_1_2.geometry}
        material={materials["20___Default"]}
      />
      <mesh
        geometry={nodes.Box001_1_3.geometry}
        material={materials["13___Default"]}
      />
      <mesh
        geometry={nodes.Box001_1_4.geometry}
        material={materials["09___Default"]}
      />
      <mesh
        geometry={nodes.Box001_1_5.geometry}
        material={materials["21___Default"]}
      />
      <mesh
        geometry={nodes.Box001_1_6.geometry}
        material={materials["08___Default"]}
      />
    </group>
  );
}

useGLTF.preload("/RemoteControl.glb");
