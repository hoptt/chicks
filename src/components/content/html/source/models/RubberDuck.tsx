/*
https://poly.pizza/m/oH3dEdlDpB
Rubber Duck by CreativeTrio
*/

import { useGLTF } from "@react-three/drei";

export function RubberDuck() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/RubberDuck.glb"
  );

  return (
    <group scale={300}>
      <mesh
        geometry={nodes.Rubber_duck.geometry}
        material={materials.Material}
      />
    </group>
  );
}
