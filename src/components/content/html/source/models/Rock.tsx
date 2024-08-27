/*
https://poly.pizza/m/RtLRqYjfMs
Rock by Quaternius
*/

import { useGLTF } from "@react-three/drei";

export function Rock() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Rock.glb");
  return (
    <group>
      <mesh
        geometry={nodes.Resource_Rock_1.geometry}
        material={materials.Stone}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
}
