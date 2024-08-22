import { useBox, useCompoundBody } from "@react-three/cannon";
import { Merged, useTexture } from "@react-three/drei";
import { memo, useEffect, useMemo } from "react";
import {
  BoxGeometry,
  ExtrudeGeometry,
  MeshStandardMaterial,
  RepeatWrapping,
  Shape,
} from "three";

export const Wall = memo(function Wall({
  args,
  color,
  position,
  rotation,
  transparent = false,
  opacity = 1,
  castShadow = true,
  isHidden = false,
}: {
  args: [number, number, number];
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  transparent?: boolean;
  opacity?: number;
  castShadow?: boolean;
  isHidden?: boolean;
}) {
  const [ref] = useBox(() => ({
    type: "Static",
    rotation,
    args,
    position,
  }));
  return (
    <group ref={ref as any}>
      {!isHidden && (
        <mesh receiveShadow castShadow={castShadow}>
          <boxGeometry args={args} />
          <meshStandardMaterial
            color={color}
            transparent={transparent}
            opacity={opacity}
          />
        </mesh>
      )}
    </group>
  );
});

export const WallTexture = memo(function WallTexture({
  args,
  position,
  rotation,
  color,
  map,
  castShadow = true,
  isHidden = false,
  repeat = 2,
}: {
  args: [number, number, number];
  position: [number, number, number];
  rotation: [number, number, number];
  castShadow?: boolean;
  color?: string;
  map: string;
  isHidden?: boolean;
  repeat?: number;
}) {
  const [ref] = useBox(() => ({
    type: "Static",
    rotation,
    args,
    position,
  }));

  const vintageWoodTexture = useTexture(`/textures/floor/${map}.jpg`).clone();

  vintageWoodTexture.wrapS = RepeatWrapping;
  vintageWoodTexture.wrapT = RepeatWrapping;
  vintageWoodTexture.repeat.x = repeat;
  vintageWoodTexture.repeat.y = repeat;
  return (
    <group ref={ref as any}>
      {!isHidden && (
        <mesh receiveShadow castShadow={castShadow}>
          <boxGeometry args={args} />
          <meshStandardMaterial map={vintageWoodTexture} color={color} />
        </mesh>
      )}
    </group>
  );
});

export const WallWithHole = memo(function WallWithHole({
  depth = 0.2,
  color,
  position,
  rotation,
  castShadow = true,
}: {
  depth?: number;
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  castShadow?: boolean;
}) {
  const wallShape = new Shape();
  wallShape.moveTo(-5, 5);
  wallShape.lineTo(5, 5);
  wallShape.lineTo(5, -2);
  wallShape.lineTo(-5, -2);
  wallShape.lineTo(-5, 5);

  const holePath = new Shape();
  holePath.moveTo(-1.8, 4.3);
  holePath.lineTo(1.8, 4.3);
  holePath.lineTo(1.8, 1);
  holePath.lineTo(-1.8, 1);
  holePath.lineTo(-1.8, 1);

  wallShape.holes.push(holePath);

  const geometry = new ExtrudeGeometry(wallShape, {
    bevelEnabled: false,
    depth,
  });

  const [ref, _] = useBox(() => ({
    type: "Static",
    args: [10, 10, 0.2],
    rotation,
    position,
  }));

  return (
    <group ref={ref as any}>
      <mesh geometry={geometry} receiveShadow castShadow={castShadow}>
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
});

/*
https://poly.pizza/m/YQu7UD8YIS
Public domain
*/

import { useGLTF } from "@react-three/drei";

export function ShojiWall() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/ShojiWall.glb"
  );
  const meshes = useMemo(
    () => ({
      Wall_Shojia: nodes.Wall_Shoji_1,
      Wall_Shojib: nodes.Wall_Shoji_2,
    }),
    []
  );

  useEffect(() => {
    materials.Atlas.color.set("#9eb2a0");
    materials.Light.color.set("#dbdada");
  }, []);
  return (
    <group>
      <Merged receiveShadow meshes={meshes}>
        {(mesh: any) => {
          return (
            <>
              <group
                scale={[200, 200, 100]}
                rotation={[0, Math.PI / 2, 0]}
                position={[-7, 0, 3]}
              >
                <mesh.Wall_Shojia material={materials.Atlas} />
                <mesh.Wall_Shojib material={materials.Light} />
              </group>
              <group
                scale={[200, 200, 100]}
                rotation={[0, Math.PI / 2, 0]}
                position={[-7, 0, -5]}
              >
                <mesh.Wall_Shojia material={materials.Atlas} />
                <mesh.Wall_Shojib material={materials.Light} />
              </group>
              <group
                scale={[200, 200, 100]}
                rotation={[0, Math.PI / 2, 0]}
                position={[-7, 0, -13]}
              >
                <mesh.Wall_Shojia material={materials.Atlas} />
                <mesh.Wall_Shojib material={materials.Light} />
              </group>
              <group
                scale={[200, 200, 100]}
                rotation={[0, Math.PI / 2, 0]}
                position={[-7, 0, -21]}
              >
                <mesh.Wall_Shojia material={materials.Atlas} />
                <mesh.Wall_Shojib material={materials.Light} />
              </group>
              <group
                scale={[200, 200, 100]}
                rotation={[0, Math.PI / 2, 0]}
                position={[-7, 0, -29]}
              >
                <mesh.Wall_Shojia material={materials.Atlas} />
                <mesh.Wall_Shojib material={materials.Light} />
              </group>
              <group
                scale={[200, 200, 100]}
                rotation={[0, Math.PI / 2, 0]}
                position={[-7, 0, -37]}
              >
                <mesh.Wall_Shojia material={materials.Atlas} />
                <mesh.Wall_Shojib material={materials.Light} />
              </group>
              <group
                scale={[200, 200, 100]}
                rotation={[0, Math.PI / 1.3, 0]}
                position={[-5, 0, 8]}
              >
                <mesh.Wall_Shojia material={materials.Atlas} />
                <mesh.Wall_Shojib material={materials.Light} />
              </group>
              <group
                scale={[200, 200, 100]}
                rotation={[0, Math.PI / 1.2, 0]}
                position={[1, 0, 12.3]}
              >
                <mesh.Wall_Shojia material={materials.Atlas} />
                <mesh.Wall_Shojib material={materials.Light} />
              </group>
              <group
                scale={[200, 200, 100]}
                rotation={[0, Math.PI / 1.2, 0]}
                position={[7.9, 0, 16.3]}
              >
                <mesh.Wall_Shojia material={materials.Atlas} />
                <mesh.Wall_Shojib material={materials.Light} />
              </group>
              <group
                scale={[200, 200, 100]}
                rotation={[0, Math.PI / 4, 0]}
                position={[21, 0, 0]}
              >
                <mesh.Wall_Shojia material={materials.Atlas} />
                <mesh.Wall_Shojib material={materials.Light} />
              </group>
            </>
          );
        }}
      </Merged>
    </group>
  );
}

useGLTF.preload("/models/ShojiWall.glb");

export function TransparentWalls() {
  useCompoundBody(() => ({
    type: "Static",
    shapes: [
      {
        type: "Box",
        args: [1, 15, 70],
        position: [-9.3, 0, -13],
        rotation: [0, 0, 0],
      },
      {
        type: "Box",
        args: [1, 15, 15],
        position: [-5, 0, 3],
        rotation: [0, Math.PI / 4, 0],
      },
      {
        type: "Box",
        args: [1, 15, 10],
        position: [4, 0, 4],
        rotation: [0, -Math.PI / 4, 0],
      },
      {
        type: "Box",
        args: [1, 15, 5],
        position: [6.5, 0, -1.5],
        rotation: [0, Math.PI / 4, 0],
      },
      {
        type: "Box",
        args: [1, 15, 30],
        position: [5.5, 0, -18],
        rotation: [0, 0, 0],
      },
    ],
  }));

  return null;
}

type Props = {
  args: [number, number, number];
  position: [number, number, number];
  color: string;
  side: number[];
};

export const BrickWall = memo(function BrickWall({
  args,
  position,
  color,
  side,
}: Props) {
  const BrickTexture = useTexture(`/textures/floor/brick.jpg`);
  const boxGeometry = new BoxGeometry(...args);
  // UV 매핑: 첫 번째 면에만 텍스처를 적용하고, 나머지 면에는 색상을 적용
  const uvAttribute = boxGeometry.attributes.uv;

  // 0 정면
  // 1 오른쪽
  // 2 뒷면
  // 3 왼쪽
  // 4 아래
  // 5 위

  // 전체 면을 흰색으로 채우고 첫 번째 면에만 텍스처를 적용하는 UV 맵 설정
  for (let i = 0; i < uvAttribute.count; i++) {
    let uvRange;
    const sideArr = [
      [i >= 16 && i < 20],
      [i >= 0 && i < 4],
      [i >= 20 && i < 24],
      [i >= 4 && i < 8],
      [i >= 12 && i < 16],
      [i >= 8 && i < 12],
    ];

    let modum = [];
    for (let j = 0; j < side.length; j++) {
      modum.push(...sideArr[side[j]]);
    }
    uvRange = modum.includes(true);
    if (uvRange) {
      // 첫 번째 면
      uvAttribute.setXY(i, uvAttribute.getX(i), uvAttribute.getY(i));
    } else {
      // 나머지 면을 텍스처의 첫 픽셀로 설정하여 사실상 색상처럼 보이도록 함
      uvAttribute.setXY(i, 0, 0);
    }
  }

  const material = new MeshStandardMaterial({
    map: BrickTexture,
    color,
  });
  return (
    <group>
      <mesh position={position} material={material} geometry={boxGeometry} />
    </group>
  );
});
