/*
https://poly.pizza/m/936irBEUnpu
Beach umbrella by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function BeachParasol() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/BeachUmbrella.glb"
  );
  return (
    <group scale={0.005} position={[11.2, 2.8, 1]}>
      <mesh
        geometry={nodes.Beach_Umbrella_1.geometry}
        material={materials.lambert3SG}
        castShadow
      />
      <mesh
        geometry={nodes.Beach_Umbrella_1_1.geometry}
        material={materials.lambert5SG}
      />
    </group>
  );
}

useGLTF.preload("/models/BeachUmbrella.glb");
