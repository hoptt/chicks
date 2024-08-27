/*
https://poly.pizza/m/Z3RCoCYss4
Chicken by Quaternius
*/

import { useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import React from "react";
import { SkeletonUtils } from "three-stdlib";

export function Chicken() {
  const { scene } = useGLTF("/models/Chicken.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials }: { nodes: any; materials: any } = useGraph(clone);

  return (
    <group name="Root_Scene">
      <group name="RootNode">
        <group
          name="AnimalArmature"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <primitive object={nodes.Body} />
          <primitive object={nodes.Root} />
        </group>
        <skinnedMesh
          name="Chicken"
          geometry={nodes.Chicken.geometry}
          material={materials.AtlasMaterial}
          skeleton={nodes.Chicken.skeleton}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
      </group>
    </group>
  );
}
