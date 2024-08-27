/*
https://poly.pizza/m/56XYDxnVVM3
Booombox by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function BooomBox() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/BooomBox.glb"
  );
  return (
    <group scale={0.05}>
      <mesh
        geometry={nodes["Boombox_Circle002-Mesh"].geometry}
        material={materials.FF5722}
      />
      <mesh
        geometry={nodes["Boombox_Circle002-Mesh_1"].geometry}
        material={materials.FFFFFF}
      />
      <mesh
        geometry={nodes["Boombox_Circle002-Mesh_2"].geometry}
        material={materials["1A1A1A"]}
      />
    </group>
  );
}
