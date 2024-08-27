import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import { BoxGeometry, MeshStandardMaterial, RepeatWrapping } from "three";
import { mergeBufferGeometries } from "three-stdlib";

export const WallDesign = () => {
  const MarbleTexture = useTexture(`/textures/floor/marble.jpg`).clone();
  MarbleTexture.wrapS = RepeatWrapping;
  MarbleTexture.wrapT = RepeatWrapping;
  MarbleTexture.repeat.x = 1;
  MarbleTexture.repeat.y = 1;
  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        map: MarbleTexture,
        color: "#e3e3e3",
      }),
    []
  );
  const mergedGeometry = useMemo(() => {
    const geometries = [];

    const box1 = new BoxGeometry(0.15, 1.5, 10);
    box1.translate(4.2, 2.5, -23.55);
    geometries.push(box1);
    const box2 = new BoxGeometry(10, 1.5, 0.15);
    box2.translate(9, 2.5, -28.4);
    geometries.push(box2);

    // 모든 지오메트리를 병합
    const mergedGeometry = mergeBufferGeometries(geometries);

    return mergedGeometry;
  }, []);

  return <mesh geometry={mergedGeometry as any} material={material} />;
};
