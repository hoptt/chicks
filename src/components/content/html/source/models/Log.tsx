/*
https://poly.pizza/m/dkRLlPSdgdR
Log by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Log() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Log.glb");
  return (
    <group>
      <mesh geometry={nodes.log.geometry} material={materials.None} />
    </group>
  );
}
