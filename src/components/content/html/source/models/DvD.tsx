/*
https://poly.pizza/m/97f76V7CW6Z
Dvd player by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function DvD() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/DvD.glb");
  return (
    <group scale={0.05}>
      <mesh
        geometry={nodes.ChamferCyl001.geometry}
        material={materials["03___Default"]}
      />
      <mesh
        geometry={nodes.ChamferCyl002.geometry}
        material={materials["03___Default"]}
      />
      <mesh
        geometry={nodes.ChamferCyl003.geometry}
        material={materials["03___Default"]}
      />
      <mesh
        geometry={nodes.Text001.geometry}
        material={materials["04___Default"]}
      />
      <mesh
        geometry={nodes.ChamferBox001_1.geometry}
        material={materials["01___Default"]}
      />
      <mesh
        geometry={nodes.ChamferBox001_1_1.geometry}
        material={materials["02___Default"]}
      />
    </group>
  );
}
