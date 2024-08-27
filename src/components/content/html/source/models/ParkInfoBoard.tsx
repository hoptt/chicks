/*
https://poly.pizza/m/KUjDbhPG3K
Park Info Board by J-Toastie [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function ParkInfoBoard() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/ParkInfoBoard.glb"
  );
  return (
    <group
      position={[0, 0.751, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[36.326, 40, 40]}
    >
      <mesh
        geometry={nodes.ParkInfoBoard_1.geometry}
        material={materials.wood_shade1}
      />
      <mesh
        geometry={nodes.ParkInfoBoard_2.geometry}
        material={materials.board}
      />
      <mesh
        geometry={nodes.ParkInfoBoard_3.geometry}
        material={materials.wood_shade2}
      />
    </group>
  );
}
