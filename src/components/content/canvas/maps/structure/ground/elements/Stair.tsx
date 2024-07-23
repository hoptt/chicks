import { useCompoundBody } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";

export default function Stair() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/StoneWalkway.glb"
  );
  useCompoundBody(() => ({
    type: "Static",
    shapes: [
      {
        type: "Box",
        position: [0, 0.25, -11],
        args: [3.75, 1.5, 1],
      },
      {
        type: "Box",
        position: [0, 0.25, -10],
        args: [3.75, 0.5, 1],
      },
    ],
  }));
  return (
    <group>
      <mesh
        geometry={nodes["walkway-stone"].geometry}
        material={materials["Texture-base.014"]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[200, 3500, 30]}
        position={[0, 0.25, -10]}
        castShadow
      />
      <mesh
        geometry={nodes["walkway-stone"].geometry}
        material={materials["Texture-base.014"]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[200, 3500, 85]}
        position={[0, 0.25, -11]}
        castShadow
      />
    </group>
  );
}
