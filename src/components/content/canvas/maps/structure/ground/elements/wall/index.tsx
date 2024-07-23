import CannonUtils from "@/utils/CannonUtils";
import {
  useBox,
  useCompoundBody,
  useConvexPolyhedron,
} from "@react-three/cannon";
import { Merged, useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { ExtrudeGeometry, Shape } from "three";

export function Wall({
  args,
  color,
  position,
  rotation,
  castShadow = true,
}: {
  args: [number, number, number];
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  castShadow?: boolean;
}) {
  const [ref] = useBox(() => ({
    type: "Static",
    rotation,
    args,
    position,
  }));

  return (
    <group ref={ref as any}>
      <mesh receiveShadow castShadow={castShadow}>
        <boxGeometry args={args} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

export function WallTexture({
  args,
  position,
  rotation,
  color,
  map,
  castShadow = true,
}: {
  args: [number, number, number];
  position: [number, number, number];
  rotation: [number, number, number];
  castShadow?: boolean;
  color?: string;
  map: string;
}) {
  const [ref] = useBox(() => ({
    type: "Static",
    rotation,
    args,
    position,
  }));

  const vintageWoodTexture = useTexture(`/textures/floor/${map}.jpg`);

  return (
    <group ref={ref as any}>
      <mesh receiveShadow castShadow={castShadow}>
        <boxGeometry args={args} />
        <meshStandardMaterial map={vintageWoodTexture} color={color} />
      </mesh>
    </group>
  );
}

export function WallWithHole({
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

  const args: any = useMemo(
    () => CannonUtils.toConvexPolyhedronProps(geometry),
    []
  );

  const [ref, _] = useConvexPolyhedron(() => ({
    type: "Static",
    args,
    rotation,
    position,
    mass: 1,
  }));

  return (
    <group ref={ref as any}>
      <mesh geometry={geometry} receiveShadow castShadow={castShadow}>
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

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
        args: [1, 15, 25],
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
        args: [1, 15, 25],
        position: [5.5, 0, -15],
        rotation: [0, 0, 0],
      },
      // {
      //   type: "Box",
      //   args: [1, 15, 5],
      //   position: [5.5, 0, -10.5],
      //   rotation: [0, 0, 0],
      // },
      // {
      //   type: "Box",
      //   args: [1, 15, 5],
      //   position: [5.5, 0, -15.5],
      //   rotation: [0, 0, 0],
      // },
      // {
      //   type: "Box",
      //   args: [1, 15, 5],
      //   position: [5.5, 0, -20.5],
      //   rotation: [0, 0, 0],
      // },
    ],
  }));

  return null;
}
