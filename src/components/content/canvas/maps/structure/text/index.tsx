import { Text3D, useTexture } from "@react-three/drei";
import { RepeatWrapping } from "three";
const fontUrl = "/fonts/Pretendard.json";
export function ChicksFlyNaming() {
  const vintageWoodTexture = useTexture(`/textures/floor/sand.jpg`).clone();

  vintageWoodTexture.wrapS = RepeatWrapping;
  vintageWoodTexture.wrapT = RepeatWrapping;
  vintageWoodTexture.repeat.x = 1;
  vintageWoodTexture.repeat.y = 1;
  return (
    <Text3D
      font={fontUrl}
      position={[-2, 2.8, 12]}
      size={1.5}
      rotation-x={-Math.PI / 2}
      castShadow
    >
      Chick's Fly
      <meshStandardMaterial map={vintageWoodTexture} />
    </Text3D>
  );
}
useTexture.preload(`/textures/floor/grass.jpg`);
