/*
https://poly.pizza/m/4dXgbKLHD9
Dingus the cat by alwayshasbean [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function DingusTheCat() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/DingusTheCat.glb"
  );

  return (
    <group position={[-3, 4.2, -29]}>
      <mesh
        geometry={nodes.Maxwell.geometry}
        material={materials.Dingus}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={20}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.whiskers.geometry}
        material={materials.Whiskers}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={20}
      />
    </group>
  );
}

useGLTF.preload("/models/DingusTheCat.glb");
