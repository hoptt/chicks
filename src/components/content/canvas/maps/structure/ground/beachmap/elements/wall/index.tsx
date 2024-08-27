import { useTexture } from "@react-three/drei";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import {
  BoxGeometry,
  ExtrudeGeometry,
  MeshStandardMaterial,
  Object3D,
  RepeatWrapping,
  Shape,
} from "three";

import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import { mergeBufferGeometries } from "three-stdlib";

type Props = {
  args: [number, number, number];
  position: [number, number, number];
  color: string;
  side: number[];
  repeat?: number;
};
export const MarbleWall = ({
  args,
  position,
  color,
  side,
  repeat = 1,
}: Props) => {
  const MarbleTexture = useTexture(`/textures/floor/marble2.jpg`).clone();
  MarbleTexture.wrapS = RepeatWrapping;
  MarbleTexture.wrapT = RepeatWrapping;
  MarbleTexture.repeat.x = repeat;
  MarbleTexture.repeat.y = repeat;

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

  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        map: MarbleTexture,
        color,
      }),
    []
  );
  return (
    <group>
      <mesh position={position} material={material} geometry={boxGeometry} />
    </group>
  );
};

/*
https://poly.pizza/m/Jw4zM0TcVo
Wood Floor by Quaternius
*/

export function WoodWall() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/WoodWall.glb"
  );

  useEffect(() => {
    materials.Atlas.color.set("#c6bd0a");
  }, []);
  const positions = [
    [13, 2.5, -18.4],
    [13, 4.5, -18.4],
    [13, 6.5, -18.4],
    [11, 2.5, -18.4],
    [11, 4.5, -18.4],
    [11, 6.5, -18.4],
    [9, 2.5, -18.4],
    [9, 4.5, -18.4],
    [9, 6.5, -18.4],
    [7, 2.5, -18.4],
    [7, 4.5, -18.4],
    [7, 6.5, -18.4],
    [5, 6.5, -18.4],
    [5, 4.5, -18.4],
    [14, 6.5, -19.43],
    [14, 4.5, -19.43],
    [14, 2.5, -19.43],
    [14, 6.5, -21.43],
    [14, 4.5, -21.43],
    [14, 2.5, -21.43],
    [14, 6.5, -23.43],
    [14, 4.5, -23.43],
    [14, 2.5, -23.43],
    [14, 6.5, -25.43],
    [14, 4.5, -25.43],
    [14, 2.5, -25.43],
    [14, 6.5, -27.43],
    [14, 4.5, -27.43],
    [14, 2.5, -27.43],
  ];

  const mergedGeometry = useRef<any>();
  const meshRef = useRef<any>();
  const [isGeometryReady, setIsGeometryReady] = useState(false);
  const dummy = useMemo(() => new Object3D(), []);

  // (1)
  useEffect(() => {
    const geometries = [nodes.Floor_Wood.geometry];

    mergedGeometry.current = mergeBufferGeometries(geometries);
    setIsGeometryReady(true);
  }, []);

  // (2)
  useEffect(() => {
    if (isGeometryReady && meshRef.current) {
      for (let i = 0; i < positions.length; i++) {
        if (i < 14) {
          // 앞
          dummy.rotation.set(Math.PI / 2, Math.PI / 2, 0);
        } else {
          // 오른쪽
          dummy.rotation.set(0, 0, -Math.PI / 2);
        }

        dummy.scale.set(50, 10, 50);
        const x = positions[i][0];
        const y = positions[i][1];
        const z = positions[i][2];
        dummy.position.set(x, y, z); // 각 인스턴스의 위치 설정
        dummy.updateMatrix();

        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [dummy, isGeometryReady]);

  return (
    <group>
      {isGeometryReady && (
        <instancedMesh
          ref={meshRef}
          args={[mergedGeometry.current, materials.Atlas, positions.length]}
          castShadow
          receiveShadow
        />
      )}

      {/* 문 옆 벽 */}
      <group
        position={[4.45, 2.5, -18.4]}
        scale={[50, 10, 22]}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
      >
        <mesh geometry={nodes.Floor_Wood.geometry} material={materials.Atlas} />
      </group>
    </group>
  );
}

export const WoodRooftop = () => {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/WoodWall.glb"
  );

  useEffect(() => {
    materials.Atlas.color.set("#c6bd0a");
  }, []);
  const positions = [
    [13, 7.501, -19.5],
    [11, 7.501, -19.5],
    [9, 7.501, -19.5],
    [7, 7.501, -19.5],
    [5, 7.501, -19.5],

    [13, 7.501, -21.5],
    [11, 7.501, -21.5],
    [9, 7.501, -21.5],
    [7, 7.501, -21.5],
    [5, 7.501, -21.5],

    [13, 7.501, -23.5],
    [11, 7.501, -23.5],
    [9, 7.501, -23.5],
    [7, 7.501, -23.5],
    [5, 7.501, -23.5],

    [13, 7.501, -25.5],
    [11, 7.501, -25.5],
    [9, 7.501, -25.5],
    [7, 7.501, -25.5],
    [5, 7.501, -25.5],

    [13, 7.501, -27.5],
    [11, 7.501, -27.5],
    [9, 7.501, -27.5],
    [7, 7.501, -27.5],
    [5, 7.501, -27.5],
  ];

  const mergedGeometry = useRef<any>();
  const meshRef = useRef<any>();
  const [isGeometryReady, setIsGeometryReady] = useState(false);
  const dummy = useMemo(() => new Object3D(), []);

  // (1)
  useEffect(() => {
    const geometries = [nodes.Floor_Wood.geometry];

    mergedGeometry.current = mergeBufferGeometries(geometries);
    setIsGeometryReady(true);
  }, []);

  // (2)
  useEffect(() => {
    if (isGeometryReady && meshRef.current) {
      for (let i = 0; i < positions.length; i++) {
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(50, 10, 55);
        const x = positions[i][0];
        const y = positions[i][1];
        const z = positions[i][2];
        dummy.position.set(x, y, z); // 각 인스턴스의 위치 설정
        dummy.updateMatrix();

        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [dummy, isGeometryReady]);

  return (
    <group>
      {isGeometryReady && (
        <instancedMesh
          ref={meshRef}
          args={[mergedGeometry.current, materials.Atlas, positions.length]}
          castShadow
          receiveShadow
        />
      )}
    </group>
  );
};

useGLTF.preload("/models/WoodWall.glb");

export const Wall = memo(function Wall({
  args,
  color,
  position,
  transparent = false,
  opacity = 1,
  castShadow = true,
  isHidden = false,
}: {
  args: [number, number, number];
  color: string;
  position: [number, number, number];
  transparent?: boolean;
  opacity?: number;
  castShadow?: boolean;
  isHidden?: boolean;
}) {
  const [ref] = useBox(() => ({
    type: "Static",
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

export const WallWithHole = memo(function WallWithHole() {
  const wallShape = new Shape();
  wallShape.moveTo(-5, 5);
  wallShape.lineTo(5, 5);
  wallShape.lineTo(5, -2);
  wallShape.lineTo(-5, -2);
  wallShape.lineTo(-5, 5);

  const holePath = new Shape();
  holePath.moveTo(-1, 4.3);
  holePath.lineTo(2, 4.3);
  holePath.lineTo(2, 1.8);
  holePath.lineTo(-1, 1.8);
  holePath.lineTo(-1, 1.8);

  wallShape.holes.push(holePath);

  const geometry = new ExtrudeGeometry(wallShape, {
    bevelEnabled: false,
    depth: 0.2,
  });

  const [ref, _] = useBox(() => ({
    type: "Static",
    args: [0.2, 6, 10.1],
    position: [4, 2.5, -23.55],
  }));

  return (
    <group ref={ref as any}>
      <mesh geometry={geometry} receiveShadow rotation-y={Math.PI / 2}>
        <meshStandardMaterial color={"#dedede"} />
      </mesh>
    </group>
  );
});
