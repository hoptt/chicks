/*
https://poly.pizza/m/0vzzmM-t8CP
Campfire by Poly by Google [CC-BY] via Poly Pizza
*/

import { Sparkles, useGLTF } from "@react-three/drei";

export function Campfire() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/Campfire.glb"
  );
  return (
    <group position={[1.7, 10, -37]} scale={0.5}>
      <mesh geometry={nodes.campfire.geometry} material={materials.None} />
      <Sparkles count={10} color={"#9c1515"} scale={2} size={10} speed={1} />
    </group>
  );
}

useGLTF.preload("/models/Campfire.glb");
