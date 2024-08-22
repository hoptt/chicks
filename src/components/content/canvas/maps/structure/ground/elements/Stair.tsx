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
        position: [0, 0.17, -9.7],
        args: [3.75, 0.3, 0.75],
      },
      {
        type: "Box",
        position: [0, 0.3, -10.45],
        args: [3.75, 0.7, 0.75],
      },
      {
        type: "Box",
        position: [0, 0.5, -11.2],
        args: [3.75, 1, 0.75],
      },
    ],
  }));
  return (
    <group>
      <mesh
        geometry={nodes["walkway-stone"].geometry}
        material={materials["Texture-base.014"]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[200, 2500, 20]}
        position={[0, 0.15, -9.75]}
        castShadow
      />
      <mesh
        geometry={nodes["walkway-stone"].geometry}
        material={materials["Texture-base.014"]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[200, 2500, 40]}
        position={[0, 0.3, -10.45]}
        castShadow
      />
      <mesh
        geometry={nodes["walkway-stone"].geometry}
        material={materials["Texture-base.014"]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[200, 2500, 85]}
        position={[0, 0.27, -11.2]}
        castShadow
      />
    </group>
  );
}
