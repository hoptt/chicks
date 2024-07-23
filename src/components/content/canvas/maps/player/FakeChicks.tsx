import { useFakeChicks } from "./hooks/useFakeChicks";
type Props = {
  positionZ: number;
};
export default function FakeChicks({ positionZ }: Props) {
  const { memoizedPosition, childRef, materials, childnodes } = useFakeChicks();
  return (
    <group ref={childRef} position={memoizedPosition}>
      <group scale={50} position={[0, 0, positionZ]}>
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
  );
}
