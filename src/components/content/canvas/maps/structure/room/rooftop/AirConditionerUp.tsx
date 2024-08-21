/*
https://poly.pizza/m/4m3lja-ZCkA
Air conditioner by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function AirConditionerUp() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/AirConditionerUp.glb"
  );
  return (
    <group position={[15, 10.65, -42]} scale={0.008} rotation-y={-Math.PI / 2}>
      <mesh
        geometry={nodes.Air_Conditioner.geometry}
        material={materials.Mat}
        castShadow
      />
    </group>
  );
}

useGLTF.preload("/models/AirConditionerUp.glb");
