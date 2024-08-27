/* 
https://poly.pizza/m/kkeII96j9N
Curtains Double by Quaternius
*/
import { useGLTF } from "@react-three/drei";
import { Vector3 } from "three";

export function Curtain() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/Curtains.glb"
  );
  const scale = new Vector3(0.035, 0.027, 0.01);
  return (
    <group scale={scale} position={[4.3, 4, -24]} rotation-y={[Math.PI / 2]}>
      <mesh
        castShadow
        geometry={nodes.Curtains.geometry}
        material={materials.Mat}
      >
        <meshStandardMaterial
          color="rgb(169, 164, 150)"
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/Curtains.glb");
