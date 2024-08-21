/*
CC-BY license
*/

import { useGLTF } from "@react-three/drei";
import { Vector3 } from "three";

export function Curtain2() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/Curtains2.glb"
  );
  const scale = new Vector3(0.2, 0.1, 0.15);
  return (
    <group scale={scale} position={[-4.8, 8.8, -38]}>
      <mesh
        geometry={nodes.p000075268.geometry}
        material={materials["0.ReflectiveMaterial"]}
      />
      <mesh
        geometry={nodes.c000165610.geometry}
        material={materials["1.BaseMaterial"]}
      />
      <mesh
        geometry={nodes.c000270926.geometry}
        material={materials["1.BaseMaterial"]}
      />
    </group>
  );
}

useGLTF.preload("/models/Curtains2.glb");
