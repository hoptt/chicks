/*
https://poly.pizza/m/FLEbO2jluO
Parasol by Zsky [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Parasol() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/Parasol.glb"
  );
  return (
    <group position={[-6, 3, -26]} scale={[0.5, 0.8, 0.5]}>
      <mesh
        geometry={nodes.Parasol1_1.geometry}
        material={materials.WoodParasol1}
        castShadow
      />
      <mesh
        geometry={nodes.Parasol1_2.geometry}
        material={materials.Parasol1}
        // castShadow
      />
    </group>
  );
}

useGLTF.preload("/models/Parasol.glb");
