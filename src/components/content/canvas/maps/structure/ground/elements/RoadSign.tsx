import { useCylinder } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";

export function RoadSign({ position }: { position: [number, number, number] }) {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/road_sign.glb"
  );
  const [active, setActive] = useState(false);

  const [ref] = useCylinder(() => ({
    args: [0.1, 0.1, 1, 8],
    type: "Static",
    onCollide: handleCollision,
    position,
  }));
  const handleCollision = () => {
    setActive(true);
  };

  useEffect(() => {
    if (active) {
      let timer;
      timer = setTimeout(() => {
        setActive(false);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [active]);

  return (
    <group ref={ref as any}>
      <mesh
        castShadow
        scale={0.2}
        position={[0, -0.48, 0]}
        geometry={nodes.Object_1_1.geometry}
        material={materials.Wood}
      />
      <group scale={0.2} position={[0, -0.48, 0]}>
        <mesh
          castShadow
          geometry={nodes.Object_1.geometry}
          material={materials["WoodLight.001"]}
        />
        <mesh
          castShadow
          geometry={nodes.Object_1_2.geometry}
          material={materials["WoodLight.002"]}
        />
        <mesh
          castShadow
          geometry={nodes.Object_1_3.geometry}
          material={materials["WoodLight.003"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/road_sign.glb");
