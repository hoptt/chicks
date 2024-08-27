/*
https://poly.pizza/m/56XYDxnVVM3
Booombox by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";
import { motion } from "framer-motion-3d";
export function BoomBox() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/BooomBox.glb"
  );
  return (
    <group
      scale={0.1}
      position={[12, 1.5, 0]}
      rotation={[-0.5, Math.PI / 3, 0.2]}
    >
      <mesh
        geometry={nodes["Boombox_Circle002-Mesh"].geometry}
        // material={materials.FF5722}
        castShadow
      >
        <meshStandardMaterial color="#4d8d91" />
      </mesh>
      <mesh
        geometry={nodes["Boombox_Circle002-Mesh_1"].geometry}
        material={materials.FFFFFF}
      />
      <motion.mesh
        animate={{
          scale: [1, 1.04, 1],
          transition: {
            repeat: Infinity,
            type: "easeInOut",
            duration: 2,
          },
        }}
        geometry={nodes["Boombox_Circle002-Mesh_2"].geometry}
        material={materials["1A1A1A"]}
      />
    </group>
  );
}

useGLTF.preload("/models/BooomBox.glb");
