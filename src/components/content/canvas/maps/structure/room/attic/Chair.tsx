/*
https://poly.pizza/m/bOuqwqoXiy2
Chair by CMHT Oculus [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";

export function Chair() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Chair.glb");
  return (
    <group position={[9, 7.55, -39.2]} scale={0.03} rotation-y={3}>
      <mesh
        geometry={nodes["Node-Mesh"].geometry}
        material={materials.Office_Cha}
      />
      <mesh
        geometry={nodes["Node-Mesh_1"].geometry}
        material={materials.Office_Cha_1}
      />
    </group>
  );
}

useGLTF.preload("/models/Chair.glb");
