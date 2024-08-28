/*
https://poly.pizza/m/TzjiI94FC5
Wooden Sign by iPoly3D
*/

import { useGLTF } from "@react-three/drei";

export function WoodenSign() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/WoodenSign.glb"
  );
  return (
    <group scale={100}>
      <mesh
        geometry={nodes.Sign7_1.geometry}
        material={materials["Dark Wood"]}
      />
      <mesh
        geometry={nodes.Sign7_2.geometry}
        material={materials["Light Wood"]}
      />
      <mesh geometry={nodes.Sign7_3.geometry} material={materials.Herbs} />
    </group>
  );
}
