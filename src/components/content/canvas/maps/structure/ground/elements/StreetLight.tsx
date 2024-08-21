/*
https://poly.pizza/m/nFwrlcLvM5
Street Light by Quaternius
*/

import { useGLTF } from "@react-three/drei";

export function StreetLight() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/StreetLight.glb"
  );
  return (
    <group
      position={[-7.5, 1, -28]}
      rotation={[-Math.PI / 2, 0, 2]}
      scale={[30, 30, 50]}
    >
      <rectAreaLight
        args={["yellow", 30, 1, 0.5]}
        position={[0, -0.025, 0.095]}
        rotation-x={-0.2}
      />
      <mesh
        geometry={nodes.StreetLight_1.geometry}
        material={materials.Grey}
        castShadow
      />
      <mesh
        geometry={nodes.StreetLight_2.geometry}
        material={materials.Light}
      />
    </group>
  );
}

useGLTF.preload("/models/StreetLight.glb");
