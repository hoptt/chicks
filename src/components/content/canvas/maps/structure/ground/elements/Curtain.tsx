import { useGLTF } from "@react-three/drei";
import { Vector3 } from "three";

export function Curtain() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/Curtains.glb"
  );
  const scale = new Vector3(0.043, 0.035, 0.01);
  return (
    <group scale={scale} position={[-4.5, 5, -38]} rotation-y={[Math.PI / 2]}>
      <mesh
        castShadow
        geometry={nodes.Curtains.geometry}
        material={materials.Mat}
      >
        <meshStandardMaterial
          color="rgb(176,165,139)"
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/Curtains.glb");
