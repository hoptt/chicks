/*
https://poly.pizza/m/dkRLlPSdgdR
Log by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Log() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Log.glb");
  return (
    <group position={[15, 2, 2]} rotation-y={2} rotation-z={0.1}>
      <mesh
        geometry={nodes.log.geometry}
        material={materials.None}
        receiveShadow
        castShadow
      />
    </group>
  );
}

useGLTF.preload("/models/Log.glb");
