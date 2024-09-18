/*
https://poly.pizza/m/aH83BlSFxJu
Candle by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Candle() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Candle.glb");
  return (
    <group>
      <mesh
        geometry={nodes.Cylinder001_Cylinder002.geometry}
        material={materials.phong1SG}
      />
    </group>
  );
}

useGLTF.preload("/models/Candle.glb");
