/*
https://poly.pizza/m/fhFGDsv5jje
Wall desk speakers by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function WallDeskSpeakers() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/WallDeskSpeakers.glb"
  );
  return (
    <group>
      <mesh
        geometry={nodes.WallDeskSpeakers_mesh.geometry}
        material={materials.lambert3SG}
      />
    </group>
  );
}
