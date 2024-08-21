import { useBox, useCompoundBody } from "@react-three/cannon";
import { Merged, useTexture } from "@react-three/drei";
import { memo, useEffect, useMemo } from "react";
import { ExtrudeGeometry, RepeatWrapping, Shape } from "three";

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

/*
https://poly.pizza/m/fMW51aYE5Hp
Brick wall by Poly by Google [CC-BY] via Poly Pizza
*/

type Props = {
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
  castShadow?: boolean;
  receiveShadow?: boolean;
};
export const BrickWall = memo(function BrickWall({
  position,
  scale,
  rotation,
  castShadow = true,
  receiveShadow = false,
}: Props) {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/BrickWall.glb"
  );

  useEffect(() => {
    materials.blinn3SG.color.set("#9a9898");
  }, []);
  return (
    <group position={position} scale={scale} rotation={rotation}>
      <mesh
        geometry={nodes.pCube102.geometry}
        material={materials.blinn3SG}
        castShadow={castShadow}
        receiveShadow={receiveShadow}
      />
    </group>
  );
});

useGLTF.preload("/models/BrickWall.glb");
