/*
https://poly.pizza/m/d6STyhH76Qe
Bush by Jarlan Perez [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/Bush.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Node.geometry} material={materials.mat9} />
    </group>
  );
}

useGLTF.preload("/Bush.glb");
