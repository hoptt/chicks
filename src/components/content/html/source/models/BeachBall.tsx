/*
https://poly.pizza/m/4IwPTeOmq6c
beach ball by the_ normalgamer [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function BeachBall() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/BeachBall.glb"
  );
  return (
    <group>
      <mesh
        geometry={nodes.mesh1945116984.geometry}
        material={materials.mat21}
        castShadow
      />
      <mesh
        geometry={nodes.mesh1945116984_1.geometry}
        material={materials.mat12}
        castShadow
      />
      <mesh
        geometry={nodes.mesh1945116984_2.geometry}
        material={materials.mat8}
        castShadow
      />
      <mesh
        geometry={nodes.mesh1945116984_3.geometry}
        material={materials.mat5}
        castShadow
      />
    </group>
  );
}
