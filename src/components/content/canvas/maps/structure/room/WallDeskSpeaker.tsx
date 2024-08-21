/*
https://poly.pizza/m/fhFGDsv5jje
Wall desk speakers by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function WallDeskSpeaker() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/WallDeskSpeakers.glb"
  );
  return (
    <group position={[15.65, 4.3, -42.1]} scale={0.12}>
      <mesh
        geometry={nodes.WallDeskSpeakers_mesh.geometry}
        material={materials.lambert3SG}
      />
    </group>
  );
}

useGLTF.preload("/models/WallDeskSpeakers.glb");
