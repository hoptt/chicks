/*
https://poly.pizza/m/tr0LwyNnCt
Rug Round by J-Toastie [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function RugRound() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/RugRound.glb"
  );
  return (
    <group position={[13.5, 4.25, -38]} scale={2}>
      <mesh
        geometry={nodes.rug.geometry}
        material={materials.rug_albedo}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
        receiveShadow
      />
    </group>
  );
}

useGLTF.preload("/models/RugRound.glb");
