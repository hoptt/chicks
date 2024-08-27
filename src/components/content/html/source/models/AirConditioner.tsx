/*
https://poly.pizza/m/5KohLH0xc8d
Air conditioner by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function AirConditioner() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/AirConditioner.glb"
  );
  return (
    <group scale={0.0015}>
      <mesh
        geometry={nodes.Air_Conditioner1.geometry}
        material={materials.lambert3SG}
      />
    </group>
  );
}
