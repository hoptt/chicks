/* 
https://poly.pizza/m/kkeII96j9N
Curtains Double by Quaternius
*/
import { useGLTF } from "@react-three/drei";

export function Curtain() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/Curtains.glb"
  );

  return (
    <group scale={0.008}>
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
