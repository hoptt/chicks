/*
https://poly.pizza/m/cUAsYHDqfD
Pallet by Quaternius
*/

import { useGLTF } from "@react-three/drei";

export function Pallet() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Pallet.glb");
  return (
    <group>
      <mesh
        geometry={nodes.Pallet.geometry}
        material={materials.Wood}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[9.346, 88.942, 9.614]}
      />
    </group>
  );
}
