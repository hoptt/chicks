import FakeChicks from "./FakeChicks";
import { useFakePlayer } from "./hooks/useFakePlayer";

export default function FakePlayer() {
  const { cylinderRef, nodes, materials, memoizedPosition } = useFakePlayer();

  return (
    <>
      <group
        ref={cylinderRef}
        position={memoizedPosition}
        rotation-y={Math.PI / 4}
      >
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
              castShadow
              name="Chicken"
              geometry={nodes.Chicken.geometry}
              material={materials.AtlasMaterial}
              skeleton={nodes.Chicken.skeleton}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100}
            />
          </group>
        </group>
      </group>

      <FakeChicks positionZ={-1.5} />
      <FakeChicks positionZ={-2.5} />
      <FakeChicks positionZ={-3.5} />
    </>
  );
}
