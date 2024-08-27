/*
https://poly.pizza/m/4jf7PTHIMTe
Picture frame by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function PictureFrame() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/PictureFrame.glb"
  );
  return (
    <group scale={0.000002}>
      <mesh
        geometry={nodes.Box001_1.geometry}
        material={materials._crayfishdiffuse}
      />
      <mesh
        geometry={nodes.Box001_1_1.geometry}
        material={materials["02___Default"]}
      />
    </group>
  );
}
