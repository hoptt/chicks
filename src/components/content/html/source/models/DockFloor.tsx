/*
https://poly.pizza/m/YAS4fY6UL1
Dock by Quaternius
*/

import { useGLTF } from "@react-three/drei";

export function DockFloor() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/DockFloor.glb"
  );
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
      <mesh
        geometry={nodes.Houses_FirstAge_3_Level1_1.geometry}
        material={materials.Wood}
      />
      <mesh
        geometry={nodes.Houses_FirstAge_3_Level1_2.geometry}
        material={materials.Wood_Light}
      />
    </group>
  );
}
