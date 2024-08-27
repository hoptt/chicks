/* 
https://poly.pizza/m/8UULkkmfhcB
Window blinds by Jarlan Perez [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function WindowBlinds() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/WindowBlinds.glb"
  );
  return (
    <group rotation-y={[Math.PI / 2]}>
      <mesh
        geometry={nodes.Node.geometry}
        material={materials.mat21}
        scale={[0.5, 0.6, 0.5]}
      />
    </group>
  );
}
