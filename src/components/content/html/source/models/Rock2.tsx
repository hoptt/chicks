/*
https://poly.pizza/m/fM90QFMNtS
Rock by Zsky [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Rock2() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Rock2.glb");
  return (
    <group>
      <mesh geometry={nodes.Rock4.geometry} material={materials.Rock4} />
    </group>
  );
}
