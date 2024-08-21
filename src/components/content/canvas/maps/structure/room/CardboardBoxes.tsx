/*
https://poly.pizza/m/V9KbWC8Vd6
Cardboard Boxes by Quaternius
*/

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export function CardboardBoxes() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/CardboardBoxes.glb"
  );
  useEffect(() => {
    materials.Cardboard.color.set("#987c60");
  }, []);
  return (
    <group
      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
      scale={30}
      position={[3.5, 1, -28.2]}
    >
      <mesh
        geometry={nodes.CardboardBoxes_4_1.geometry}
        material={materials.Cardboard}
        receiveShadow
        castShadow
      />
      <mesh
        geometry={nodes.CardboardBoxes_4_2.geometry}
        material={materials.Tape}
      />
    </group>
  );
}

useGLTF.preload("/models/CardboardBoxes.glb");
