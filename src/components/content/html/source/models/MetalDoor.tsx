/*
https://poly.pizza/m/PCJv96DB6b
Metal Door by Quaternius
*/

import { useGLTF } from "@react-three/drei";

export function MetalDoor() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/MetalDoor.glb"
  );
  return (
    <group scale={100}>
      <mesh
        geometry={nodes.Door_Closed_1.geometry}
        material={materials.Atlas}
      />
      <mesh
        geometry={nodes.Door_Closed_2.geometry}
        material={materials.Material}
      />
    </group>
  );
}
