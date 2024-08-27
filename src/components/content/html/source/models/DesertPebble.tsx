/*
https://poly.pizza/m/fqhwoqMd8A-
Desert pebble by Leigh Garland [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function DesertPebble() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/DesertPebble.glb"
  );
  return (
    <group scale={5}>
      <mesh
        geometry={nodes.group536976416.geometry}
        material={materials.mat18}
      />
    </group>
  );
}
