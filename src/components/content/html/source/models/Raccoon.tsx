/*
https://poly.pizza/m/xMmx6VQP3r
Raccoon by Quaternius
*/

import { useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import React from "react";
import { SkeletonUtils } from "three-stdlib";

export function Raccoon() {
  const { scene } = useGLTF("/models/Raccoon.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials }: { nodes: any; materials: any } = useGraph(clone);
  // const { actions } = useAnimations(animations, group);
  return (
    <group name="Root_Scene">
      <group name="RootNode">
        <group
          name="AnimalArmature"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <primitive object={nodes.All} />
          <primitive object={nodes.Root} />
        </group>
        <skinnedMesh
          name="Raccoon"
          geometry={nodes.Raccoon.geometry}
          material={materials.AtlasMaterial}
          skeleton={nodes.Raccoon.skeleton}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={53.861}
        />
      </group>
    </group>
  );
}
