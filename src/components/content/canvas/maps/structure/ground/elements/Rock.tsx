/*
https://poly.pizza/m/6XGxZYQUtM
Rock by Pixel [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Rock() {
  const { nodes, materials } = useGLTF("/models/Rock.glb");
  return (
    <group>
      <mesh
        geometry={nodes["Rock-pack-ver2"].geometry}
        material={materials["Texture-base.014"]}
        scale={200}
        position={[-8.5, 1, -16.5]}
        rotation-y={-Math.PI / 1.05}
        castShadow
        receiveShadow
      />
    </group>
  );
}

useGLTF.preload("/models/Rock.glb");
