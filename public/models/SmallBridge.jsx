/*
https://poly.pizza/m/j4KsIuJYnq
Public Domain
*/

import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/SmallBridge.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Bridge_Small.geometry}
        material={materials.Wood}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload("/SmallBridge.glb");
