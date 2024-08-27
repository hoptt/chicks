/*
https://poly.pizza/m/Jw4zM0TcVo
Wood Floor by Quaternius
*/

import { useGLTF } from "@react-three/drei";

export function WoodWall() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/WoodWall.glb"
  );
  return (
    <group>
      <mesh
        geometry={nodes.Floor_Wood.geometry}
        material={materials.Atlas}
        scale={100}
      />
    </group>
  );
}
