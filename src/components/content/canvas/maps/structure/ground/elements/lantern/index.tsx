/*
https://poly.pizza/m/ZSQ65S4lEu
Public Domain
*/

import {
  IsInsideHouseAtom,
  IsInsideLightPortalAtom,
} from "@/store/InteractionAtom";
import { Merged, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { Fragment, memo, useMemo, useRef, useState } from "react";
import { useRecoilValue } from "recoil";

export function PostLantern() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/PostLantern.glb"
  );
  const spriteRefs = useRef<any>([]);
  const texture = useTexture(
    "https://threejs.org/examples/textures/sprites/disc.png"
  );
  const [lightDispersion, setLightDispersion] = useState(0);

  // 불빛이 퍼지는 효과
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    spriteRefs.current.forEach((_: any, index: number) => {
      const delay = index * 0.5;
      const scale = 1 + Math.sin(time * 2 + delay) * 0.5;
      const opacity = 0.1 + Math.sin(time * 2 + delay) * 0.001;

      if (spriteRefs.current[index]) {
        spriteRefs.current[index].scale.set(scale, scale, scale);
        spriteRefs.current[index].material.opacity = opacity;
        setLightDispersion(() => 1 + scale * 2.5);
      }
    });
  });

  return (
    <>
      <group position={[-6, 2, -1]}>
        {[...Array(3)].map((_, i) => (
          <sprite
            key={i}
            ref={(el) => (spriteRefs.current[i] = el)}
            position={[0.75, -0.5, 0]}
          >
            <spriteMaterial
              attach="material"
              map={texture}
              color="yellow"
              transparent
              opacity={0.8}
            />
          </sprite>
        ))}
        <pointLight
          args={["#ffffff", 5, 5, 1.1]}
          position={[0.9, -0.5, 0]}
          intensity={lightDispersion}
          decay={lightDispersion / 5}
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
    </>
  );
}

useGLTF.preload("/models/PostLantern.glb");

/*
https://poly.pizza/m/OjxFIIVnp6
Public domain
*/

export function LampSquareTable() {
  const IsInsideLightPortal = useRecoilValue(IsInsideLightPortalAtom);
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
      {(mesh: any) => (
        <>
          {Array.from({ length: 8 }).map((_, idx) => (
            <Fragment key={idx}>
              <group position={position[idx]}>
                <motion.group
                  initial={{ scale: -1 }}
                  animate={{
                    scale: IsInsideLightPortal ? 1 : -1,
                    transition: {
                      delay: [0, 1].includes(idx)
                        ? 0
                        : [2, 3].includes(idx)
                        ? 0.15
                        : [4, 5].includes(idx)
                        ? 0.3
                        : 1,
                    },
                  }}
                >
                  <pointLight
                    args={["yellow", 5, 3, 1.5]}
                    position-z={0.2}
                    position-y={0.8}
                  />
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

/*
https://poly.pizza/m/PSoamNnBPO
Light Square by Quaternius
*/

type LightSquareProps = {
  position: [number, number, number];
};
function LightSquare({ position }: LightSquareProps) {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/LightSquare.glb"
  );
  const isInnerHouse = useRecoilValue(IsInsideHouseAtom);
  return (
    <group position={position}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        {!isInnerHouse && (
          <>
            <mesh
              geometry={nodes.Light_Square_1.geometry}
              material={materials.DarkGrey}
              receiveShadow
              castShadow
            />
            <mesh
              geometry={nodes.Light_Square_2.geometry}
              material={materials.Grey}
              receiveShadow
              castShadow
            />
            <mesh
              geometry={nodes.Light_Square_3.geometry}
              material={materials.Light}
              receiveShadow
              castShadow
            />
          </>
        )}
      </group>
      <rectAreaLight
        args={[0xb5e7ff, 1, 1, 1]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.08, 0]}
      />
    </group>
  );
}
export default memo(LightSquare);
useGLTF.preload("/models/LightSquare.glb");
