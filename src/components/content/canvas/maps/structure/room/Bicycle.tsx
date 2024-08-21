/*
https://poly.pizza/m/19VoUuA2pcN
Bicycle by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Bicycle() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/Bicycle.glb"
  );

  return (
    <group position={[10, 1, -30]} rotation={[-Math.PI / 10, 0, 0]} scale={0.8}>
      <mesh
        geometry={nodes.Bike_mesh.geometry}
        material={materials.Bike_mat1}
        receiveShadow
      />
    </group>
  );
}

useGLTF.preload("/models/Bicycle.glb");
