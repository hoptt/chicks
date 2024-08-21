import { useBox } from "@react-three/cannon";
import { useTexture } from "@react-three/drei";

export default function Grass() {
  const [ref] = useBox(() => ({
    type: "Static",

    args: [7, 0.1, 8],
    position: [1, 10.1, -37.8],
  }));

  const vintageWoodTexture = useTexture(`/textures/floor/grass.jpg`);

  //   vintageWoodTexture.wrapS = RepeatWrapping;
  //   vintageWoodTexture.wrapT = RepeatWrapping;
  //   vintageWoodTexture.repeat.x = 1;
  //   vintageWoodTexture.repeat.y = 1;
  return (
    <group ref={ref as any}>
      <mesh receiveShadow>
        <boxGeometry args={[7, 0.1, 8]} />
        <meshStandardMaterial map={vintageWoodTexture} color={"#09700f"} />
      </mesh>
    </group>
  );
}

useTexture.preload(`/textures/floor/grass.jpg`);
