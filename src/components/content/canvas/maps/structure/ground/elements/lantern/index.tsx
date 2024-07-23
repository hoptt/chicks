/*
https://poly.pizza/m/ZSQ65S4lEu
Public Domain
*/

import { Merged, useGLTF } from "@react-three/drei";
import { Fragment, useMemo } from "react";
import { motion } from "framer-motion-3d";
import { useRecoilValue } from "recoil";
import { PlayerOutsideTutorialAtom } from "@/store/PlayersAtom";
export function PostLantern() {
  const { nodes, materials } = useGLTF("/models/PostLantern.glb");
  return (
    <group position={[-6, 2, -1]}>
      <pointLight
        args={["#ffffff", 5, 5, 1.1]}
        position={[0.9, -0.39, 0]}
        castShadow
      />
      <group position={[0, -2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh
          geometry={nodes.post_lantern.geometry}
          material={materials.HalloweenBits}
          scale={75}
          castShadow
        >
          <mesh
            geometry={nodes.post_lantern_lantern.geometry}
            material={materials.HalloweenBits}
            position={[0, 0.03, 0.01]}
          >
            {/* <meshStandardMaterial /> */}
          </mesh>
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/models/PostLantern.glb");

/*
https://poly.pizza/m/OjxFIIVnp6
Public domain
*/

export function LampSquareTable() {
  const playerOutsideTutorial = useRecoilValue(PlayerOutsideTutorialAtom);
  const { nodes, materials } = useGLTF("/models/LampSquareTable.glb");
  const meshes = useMemo(
    () => ({
      LampNode3: nodes.lampSquareTable_3,
      LampNode4: nodes.lampSquareTable_3_1,
    }),
    []
  );
  const position: [number, number, number][] = [
    [-2.2, 0, -7],
    [2.5, 0, -7],
    [-2.2, 0, -10],
    [2.5, 0, -10],
    [-2.2, 1, -13],
    [2.5, 1, -13],
    [-2.2, 1, -21],
    [2.5, 1, -21],
  ];
  return (
    <Merged castShadow receiveShadow meshes={meshes}>
      {(mesh) => (
        <>
          {Array.from({ length: 8 }).map((_, idx) => (
            <Fragment key={idx}>
              <group position={position[idx]}>
                <motion.group
                  initial={{ scale: -1 }}
                  animate={{
                    scale: playerOutsideTutorial ? 1 : -1,
                    transition: {
                      delay: [0, 1].includes(idx)
                        ? 0.5
                        : [2, 3].includes(idx)
                        ? 1
                        : [4, 5].includes(idx)
                        ? 1.5
                        : 2,
                    },
                  }}
                >
                  <pointLight args={["yellow", 5, 3, 1]} position-y={0.3} />
                </motion.group>

                <group scale={2.5}>
                  <mesh.LampNode3 material={materials.metal} />
                  <mesh.LampNode4 material={materials.lamp} />
                </group>
              </group>
            </Fragment>
          ))}
        </>
      )}
    </Merged>
  );
}

useGLTF.preload("/models/LampSquareTable.glb");
