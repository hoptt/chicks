import { useBox, usePlane } from "@react-three/cannon";
import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { Object3D, RepeatWrapping } from "three";
import { Bush } from "../Bush";
import { Dandelions } from "../flower";
import { Grass1, Grass2, Grass3, Grass4 } from "../grass";
export function FloorVintage() {
  const vintageWoodTexture = useTexture("/textures/floor/VintageWood.jpg");

  vintageWoodTexture.wrapS = RepeatWrapping;
  vintageWoodTexture.wrapT = RepeatWrapping;
  vintageWoodTexture.repeat.x = 5;
  vintageWoodTexture.repeat.y = 5;

  return (
    <mesh castShadow receiveShadow rotation-x={-Math.PI / 2}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial map={vintageWoodTexture} />
    </mesh>
  );
}

export function FloorGround() {
  const GreenTexture = useTexture("/textures/floor/green.jpg");
  const x = 0;
  const z = 0;
  const width = 50;
  const height = 50;
  const [ref] = usePlane(() => ({
    type: "Static",
    material: "ground",
    rotation: [-Math.PI / 2, 0, 0],
    position: [x, -0.01, z],
  }));

  /* 
  // 내부에 풀과 꽃을 심기위한 사각형(땅) 좌표 범위 구하기

  a = (height/2) + z 
  b = height + (height/2) + z
  Math.random() * (a - b) + a

  a = (width/2) + x
  b = width + (width/2) + x
  Math.random() * (a - b) + a
  */

  const startX = useMemo(() => -(width / 2) + x, []);
  const endX = useMemo(() => width + startX, []);

  const startZ = useMemo(() => -(height / 2) + z, []);
  const endZ = useMemo(() => height + startZ, []);

  GreenTexture.wrapS = RepeatWrapping;
  GreenTexture.wrapT = RepeatWrapping;
  GreenTexture.repeat.x = 50;
  GreenTexture.repeat.y = 50;
  return (
    <>
      <group ref={ref as any}>
        <mesh castShadow receiveShadow>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial map={GreenTexture} />
        </mesh>
      </group>
      <group>
        <Grass1 count={10} x={[startX, endX]} y={0} z={[startZ, endZ]} />
        <Grass2 count={10} x={[startX, endX]} y={0} z={[startZ, endZ]} />
        <Grass3 count={10} x={[startX, endX]} y={0} z={[startZ, endZ]} />
        <Grass4 count={10} x={[startX, endX]} y={0} z={[startZ, endZ]} />
        <Bush />

        <Dandelions count={10} x={[startX, endX]} y={0.5} z={[startZ, endZ]} />
        <rectAreaLight
          args={["#adcc00", 2, 3, 3]}
          position={[0, 0, 0]}
          rotation-x={Math.PI / 2}
        />
        {/* <Marigold /> */}
      </group>
    </>
  );
}

export function Floor2nd() {
  const GreenTexture = useTexture("/textures/floor/green.jpg");
  const x = 0;
  const z = -45;
  const width = 50;
  const height = 50;

  const [ref] = useBox(() => ({
    type: "Static",
    material: "ground",
    rotation: [-Math.PI / 2, 0, 0],
    position: [x, 0.5, z],
    args: [width, height, 1],
  }));

  /* 
  // 내부에 풀과 꽃을 심기위한 사각형(땅) 좌표 범위 구하기

  a = (height/2) + z 
  b = height + (height/2) + z
  Math.random() * (a - b) + a

  a = (width/2) + x
  b = width + (width/2) + x
  Math.random() * (a - b) + a
  */

  const startX = useMemo(() => -(width / 2) + x, []);
  const endX = useMemo(() => width + startX, []);

  const startZ = useMemo(() => -(height / 2) + z, []);
  const endZ = useMemo(() => height + startZ, []);

  return (
    <>
      <group ref={ref as any}>
        <mesh castShadow receiveShadow position-z={-14.5}>
          <boxGeometry args={[width, height, 30]} />
          <meshStandardMaterial map={GreenTexture} />
        </mesh>
      </group>
      {/* <group>
        <mesh
          castShadow
          receiveShadow
          position={[0, 2, -11.5]}
          rotation-x={Math.PI / 2}
        >
          <boxGeometry args={[30, 1, 1]} />
          <meshStandardMaterial map={GreenTexture} />
        </mesh>
      </group> */}
      <group>
        <Grass1 count={10} x={[startX, endX]} y={1} z={[startZ, endZ]} />
        <Grass2 count={10} x={[startX, endX]} y={1} z={[startZ, endZ]} />
        <Grass3 count={10} x={[startX, endX]} y={1} z={[startZ, endZ]} />
        <Grass4 count={10} x={[startX, endX]} y={1} z={[startZ, endZ]} />

        <Dandelions count={10} x={[startX, endX]} y={1.5} z={[startZ, endZ]} />
      </group>
    </>
  );
}

export function FloorWhiteStone() {
  const StoneTexture = useTexture("/textures/floor/Stone.jpg");
  const x = 0;
  const z = -13;
  const width = 50;
  const height = 3;

  const [ref] = useBox(() => ({
    type: "Static",
    material: "ground",
    rotation: [-Math.PI / 2, 0, 0],
    position: [x, 0.5, z],
    args: [width, height, 1],
  }));

  StoneTexture.wrapS = RepeatWrapping;
  StoneTexture.wrapT = RepeatWrapping;
  StoneTexture.repeat.x = 15;
  StoneTexture.repeat.y = 1;

  return (
    <>
      <group ref={ref as any}>
        <mesh castShadow receiveShadow position-z={-14.5}>
          <boxGeometry args={[width, height, 30]} />
          <meshStandardMaterial map={StoneTexture} color={"#868786"} />
        </mesh>
      </group>
    </>
  );
}

/*
https://poly.pizza/m/Im0kSO5tiJ
Stone Walkway by Pixel [CC-BY] via Poly Pizza
*/
type Props = {
  count: number;
  height: number;
  y: number;
  z: number;
  z2: number;
};
export function FloorStoneWalkway({ count, height, y, z, z2 }: Props) {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/StoneWalkway.glb"
  );

  const meshRef = useRef<any>();
  const dummy = useMemo(() => new Object3D(), []);

  // (2)
  useEffect(() => {
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        dummy.scale.set(200, 100, 100);

        dummy.position.set(0, 0.01 + y, i * -1.5 + z); // 각 인스턴스의 위치 설정
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [dummy]);
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0 + y, z2]}>
        <planeGeometry args={[3.8, height]} />
        <meshStandardMaterial color={"#4a3d00"} />
      </mesh>
      <instancedMesh
        ref={meshRef}
        args={[
          nodes["walkway-stone"].geometry,
          materials["Texture-base.014"],
          count,
        ]}
        castShadow
        receiveShadow
      />
    </group>
  );
}
useGLTF.preload("/models/StoneWalkway.glb");
