import { Text3D, useTexture } from "@react-three/drei";
import { RepeatWrapping } from "three";
const fontUrl = "/fonts/Pretendard.json";
export function ChicksFlyNaming() {
  const vintageWoodTexture = useTexture(`/textures/floor/grass.jpg`).clone();

  vintageWoodTexture.wrapS = RepeatWrapping;
  vintageWoodTexture.wrapT = RepeatWrapping;
  vintageWoodTexture.repeat.x = 1;
  vintageWoodTexture.repeat.y = 1;
  return (
    <Text3D
      font={fontUrl}
      rotation={[-Math.PI / 2, 0, Math.PI / 4]}
      position={[1, -0.1, 8]}
      size={1.5}
      castShadow
    >
      Chick's Fly
      <meshStandardMaterial map={vintageWoodTexture} />
    </Text3D>
  );
}
useTexture.preload(`/textures/floor/grass.jpg`);
