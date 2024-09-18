/*
https://poly.pizza/m/WoXpAJT0oD
Cone by J-Toastie [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import { memo, useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";

export const PlayerCone = memo(function PlayerCone() {
  const { scene, materials } = useGLTF(`/models/Cone.glb`);
  const clone = useMemo(() => SkeletonUtils.clone(scene), []);
  const objectMap = useGraph(clone);
  const conenodes: any = objectMap.nodes;
  return (
    <group rotation={[0, 0.8, 0]} scale={[0.8, 0.7, 0.8]}>
      <mesh
        geometry={conenodes["Cone_Cube-Mesh"].geometry}
        material={materials.Dark_gray}
        scale={0.8}
      />
      {/* <mesh
        geometry={nodes["Cone_Cube-Mesh_1"].geometry}
        material={materials.Black}
      /> */}
      <mesh
        geometry={conenodes["Cone_Cube-Mesh_2"].geometry}
        material={materials.Orange}
      />
      <mesh
        geometry={conenodes["Cone_Cube-Mesh_3"].geometry}
        material={materials.White}
      />
    </group>
  );
});
