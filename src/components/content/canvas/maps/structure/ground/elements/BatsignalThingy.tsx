/*
https://poly.pizza/m/1XHM3E7rzsT
Bat signal Thingy by Clorama Dorvilias [CC-BY] via Poly Pizza
*/

import { PlayerOutsideTutorialAtom } from "@/store/PlayersAtom";
import { SpotLight, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useEffect, useMemo, useRef } from "react";
import { useRecoilValue } from "recoil";
import { DoubleSide, Object3D } from "three";
import { mergeBufferGeometries } from "three-stdlib";

export function BatsignalThingy() {
  const playerOutsideTutorial = useRecoilValue(PlayerOutsideTutorialAtom);
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/BatsignalThingy.glb"
  );
  const object = useMemo(() => new Object3D(), []);
  const object2 = useMemo(() => new Object3D(), []);
  const spotLightRef1 = useRef<any>();
  const spotLightRef2 = useRef<any>();
  const mergedGeometry = useRef<any>();

  useEffect(() => {
    if (!spotLightRef1.current || !spotLightRef2.current) return;
    object.position.set(0, 4.5, -24);
    object2.position.set(0, 4.5, -24);
    spotLightRef1.current.target = object;
    spotLightRef2.current.target = object2;
  }, []);

  // (1)
  useEffect(() => {
    const geometries = [
      nodes.group764504111.geometry,
      nodes.group1981873613.geometry,
      nodes.group704803567.geometry,
      nodes.group1508377277.geometry,
      nodes.group1644816186.geometry,
      nodes.group205185113.geometry,
      nodes.group1368240951.geometry,
      nodes.group183236212.geometry,
      nodes.group1026584984.geometry,
      nodes.mesh508357560.geometry,
    ];

    mergedGeometry.current = mergeBufferGeometries(geometries);
  }, [nodes]);

  return (
    <group>
      <motion.group
        initial={{ scaleY: -1 }}
        animate={{
          scaleY: playerOutsideTutorial ? 1 : -1,
          transition: { delay: 3.5 },
        }}
      >
        <SpotLight
          ref={spotLightRef1}
          color={0xffffff}
          intensity={10}
          angle={1.3}
          distance={20}
          penumbra={1}
          decay={1.5}
          anglePower={1}
          attenuation={300}
          radiusTop={0.05}
          radiusBottom={1.5}
          opacity={0.5}
          position={[-2.8, 1.3, -24]}
        />
      </motion.group>

      <mesh
        scale={5}
        position={[-2.5, 1.3, -24]}
        rotation={[0, -3, -0.13]}
        geometry={mergedGeometry.current}
        material={materials.mat22}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#818181" side={DoubleSide} />
      </mesh>

      <motion.group
        initial={{ scaleY: -1 }}
        animate={{
          scaleY: playerOutsideTutorial ? 1 : -1,
          transition: { delay: 3.5 },
        }}
      >
        <SpotLight
          ref={spotLightRef2}
          color={0xffffff}
          intensity={10}
          angle={1.3}
          distance={20}
          penumbra={1}
          decay={1.5}
          anglePower={1}
          attenuation={300}
          radiusTop={0.05}
          radiusBottom={1.5}
          opacity={0.5}
          position={[2.8, 1.3, -24]}
        />
      </motion.group>

      <mesh
        scale={5}
        position={[2.5, 1.25, -24]}
        rotation={[0, 0.5, -0.13]}
        geometry={mergedGeometry.current}
        material={materials.mat22}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#818181" />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/BatsignalThingy.glb");
