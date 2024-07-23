/*
https://poly.pizza/m/KUjDbhPG3K
Park Info Board by J-Toastie [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export function ParkInfoBoard() {
  const { nodes, materials } = useGLTF("/models/ParkInfoBoard.glb");

  useEffect(() => {
    materials.wood_shade1.color.set("#6a4929");
    materials.wood_shade2.color.set("#7b5d3e");
  }, []);
  return (
    <group
      position={[-4.5, 1.7, -4.5]}
      rotation={[-Math.PI / 2, 0, Math.PI / 4]}
      scale={[150, 100, 100]}
    >
      <mesh
        geometry={nodes.ParkInfoBoard_1.geometry}
        material={materials.wood_shade1}
        castShadow
      />

      <mesh
        geometry={nodes.ParkInfoBoard_2.geometry}
        material={materials.board}
        castShadow
      />
      <mesh
        geometry={nodes.ParkInfoBoard_3.geometry}
        material={materials.wood_shade2}
        castShadow
      />
    </group>
  );
}

useGLTF.preload("/models/ParkInfoBoard.glb");
