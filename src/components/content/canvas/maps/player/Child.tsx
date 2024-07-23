import { IChick } from "@/types";
import { useChild } from "./hooks/useChild";
type Props = {
  info: IChick;
  position: [number, number, number];
  idx: number;
};
export default function Child({
  info: { position: eggPosition, type },
  position,
  idx,
}: Props) {
  const { childRef, childnodes, materials, memoizedEggPosition } = useChild(
    position,
    eggPosition,
    type,
    idx
  );

  if (type === "Chick") {
    return (
      <group ref={childRef} position={memoizedEggPosition}>
        <group name="Root_Scene" scale={50}>
          <group name="RootNode">
            <group name="AnimalArmature" rotation={[-Math.PI / 2, 0, 0]}>
              <primitive object={childnodes.Body} />
              <primitive object={childnodes.Root} />
            </group>
            <skinnedMesh
              name="Chicken"
              geometry={childnodes.Chicken.geometry}
              material={materials.AtlasMaterial}
              skeleton={childnodes.Chicken.skeleton}
              rotation={[-Math.PI / 2, 0, 0]}
              castShadow
            />
          </group>
        </group>
      </group>
    );
  } else if (type === "Raccoon") {
    return (
      <group ref={childRef} position={memoizedEggPosition}>
        <group name="Root_Scene">
          <group name="RootNode">
            <group
              name="AnimalArmature"
              rotation={[-Math.PI / 2, 0, 0]}
              scale={30}
            >
              <primitive object={childnodes.All} />
              <primitive object={childnodes.Root} />
            </group>
            <skinnedMesh
              name="Raccoon"
              geometry={childnodes.Raccoon.geometry}
              material={materials.AtlasMaterial}
              skeleton={childnodes.Raccoon.skeleton}
              rotation={[-Math.PI / 2, 0, 0]}
              castShadow
            />
          </group>
        </group>
      </group>
    );
  } else {
    return null;
  }
}
