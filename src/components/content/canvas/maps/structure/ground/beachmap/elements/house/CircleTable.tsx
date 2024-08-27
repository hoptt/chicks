/*
https://poly.pizza/m/8RW134iS2gW
Table by jeremy [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export function CircleTable() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/CircleTable.glb"
  );
  useEffect(() => {
    materials["795548"].color.set("#858281");
  }, []);
  return (
    <group position={[10.5, 1.7, -23]} scale={0.1}>
      <mesh
        geometry={nodes.Table_Small_Circular_01_Circle009.geometry}
        material={materials["795548"]}
        receiveShadow
      />
    </group>
  );
}

useGLTF.preload("/models/CircleTable.glb");
