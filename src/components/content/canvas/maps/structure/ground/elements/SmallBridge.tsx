/*
https://poly.pizza/m/j4KsIuJYnq
Public Domain
*/

import { useGLTF } from "@react-three/drei";

export function SmallBridge() {
  const { nodes, materials } = useGLTF("/models/SmallBridge.glb");
  return (
    <group>
      <mesh
        geometry={nodes.Bridge_Small.geometry}
        material={materials.Wood}
        position={[0, 1, -18]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        scale={[100, 150, 50]}
      />
    </group>
  );
}

useGLTF.preload("/models/SmallBridge.glb");
