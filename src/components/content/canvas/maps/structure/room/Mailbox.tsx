/*
https://poly.pizza/m/2olZ0G8iur
Mailbox by CreativeTrio
*/

import { useGLTF } from "@react-three/drei";

export function Mailbox() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/Mailbox.glb"
  );
  return (
    <group position={[-2.5, 1, -27.8]} rotation-y={Math.PI / 2} scale={1.5}>
      <mesh
        geometry={nodes.Mailbox.geometry}
        material={materials.Material}
        scale={120}
        castShadow
      />
    </group>
  );
}

useGLTF.preload("/models/Mailbox.glb");
