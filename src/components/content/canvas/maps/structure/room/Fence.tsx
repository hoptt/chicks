/*
https://poly.pizza/m/qWKhREFj7H
Metal Fence by Quaternius
*/

import { IsInsideHouseAtom } from "@/store/InteractionAtom";
import { useGLTF } from "@react-three/drei";
import { memo, useEffect } from "react";
import { useRecoilValue } from "recoil";

type Props = {
  position: [number, number, number];
  rotation?: [number, number, number];
};
function GFence({ position, rotation = [0, 0, 0] }: Props) {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/GFence.glb");
  const isInnerHouse = useRecoilValue(IsInsideHouseAtom);
  useEffect(() => {
    const modifiedMaterial = materials.Grey;
    modifiedMaterial.color.set("#c6c4c4");
  }, []);
  return (
    <>
      <group position={position} rotation={rotation}>
        <group scale={[60, 70, 100]}>
          {!isInnerHouse && (
            <mesh
              geometry={nodes.MetalFence_1.geometry}
              material={materials.Grey}
              castShadow
              receiveShadow
            />
          )}

          {/* <mesh
            geometry={nodes.MetalFence_2.geometry}
            material={nodes.MetalFence_2.material}
            /> */}
        </group>
        <mesh position={[-0.01, 0.8, -0.2]} castShadow receiveShadow>
          {!isInnerHouse && <boxGeometry args={[1.95, 1.35, 0.1]} />}
          <meshStandardMaterial color={"#b5e7ff"} transparent opacity={0.5} />
        </mesh>
      </group>
    </>
  );
}
export default memo(GFence);

useGLTF.preload("/models/GFence.glb");
