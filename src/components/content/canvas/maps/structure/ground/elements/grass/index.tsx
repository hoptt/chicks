/**
 * 1. 모델의 세부 mesh 가 10개여서 merge 하여 하나의 DrawCall 로 모델 그릴수 있도록 만들어주기
 * 2. merge 된 모델을 여러개 그려도 한번의 DrawCall 을 할 수 있도록 instancedMesh 사용
 * 최종 )) 50 개의 풀을 그려도 최종 DrawCall 은 한번만
 */

/*
https://poly.pizza/m/UGTOzcO3P2
Public Domain
*/

import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { Object3D } from "three";
import { mergeBufferGeometries } from "three-stdlib";

export function Grass1({
  count,
  x,
  y,
  z,
}: {
  count: number;
  x: [number, number];
  y: number;
  z: [number, number];
}) {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Grass1.glb");
  const [startX, endX] = x;
  const [startZ, endZ] = z;

  const mergedGeometry = useRef<any>();
  const meshRef = useRef<any>();
  const [isGeometryReady, setIsGeometryReady] = useState(false);
  const dummy = useMemo(() => new Object3D(), []);

  // (1)
  useEffect(() => {
    const geometries = [
      nodes.Grass_Large_Extruded.geometry,
      nodes.Grass_Small.geometry,
    ];

    mergedGeometry.current = mergeBufferGeometries(geometries);
    setIsGeometryReady(true);
  }, [nodes]);

  // (2)
  useEffect(() => {
    if (isGeometryReady && meshRef.current) {
      for (let i = 0; i < count; i++) {
        dummy.rotation.set(-Math.PI / 2, 0, 0);
        dummy.scale.set(100, 100, 100);
        const x = Math.random() * (endX - startX) + startX;
        const z = Math.random() * (endZ - startZ) + startZ;
        dummy.position.set(x, y, z); // 각 인스턴스의 위치 설정
        dummy.updateMatrix();

        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [dummy, isGeometryReady]);

  return (
    <group>
      {mergedGeometry.current && (
        <instancedMesh
          ref={meshRef}
          args={[mergedGeometry.current, materials.Grass, count]}
          castShadow
        />
      )}
    </group>
  );
}

useGLTF.preload("/models/Grass1.glb");

/*
https://poly.pizza/m/00rprwmzLKP
Grass #1 by Tomáš Bayer [CC-BY] via Poly Pizza
*/

export function Grass2({
  count,
  x,
  y,
  z,
}: {
  count: number;
  x: [number, number];
  y: number;
  z: [number, number];
}) {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Grass2.glb");
  const [startX, endX] = x;
  const [startZ, endZ] = z;
  const mergedGeometry = useRef<any>();
  const meshRef = useRef<any>();
  const [isGeometryReady, setIsGeometryReady] = useState(false);
  const dummy = useMemo(() => new Object3D(), []);

  // (1)
  useEffect(() => {
    const geometries = [
      nodes.Mesh1_ElwFor_Grass01_C01_1_Model.geometry,
      nodes.Mesh2_ElwFor_Grass01_C01_2_Model.geometry,
      nodes.Mesh3_ElwFor_Grass01_C02_1_Model.geometry,
      nodes.Mesh4_ElwFor_Grass01_C01_3_Model.geometry,
      nodes.Mesh5_ElwFor_Grass01_C02_2_Model.geometry,
      nodes.Mesh6_ElwFor_Grass01_C02_3_Model.geometry,
      nodes.Mesh7_ElwFor_Grass01_C02_4_Model.geometry,
      nodes.Mesh8_ElwFor_Grass01_C02_5_Model.geometry,
      nodes.Mesh9_ElwFor_Grass01_C02_6_Model.geometry,
      nodes.Mesh10_ElwFor_Grass01_C02_7_Model.geometry,
      nodes.Mesh11_ElwFor_Grass01_C02_8_Model.geometry,
      nodes.Mesh12_ElwFor_Grass01_C01_4_Model.geometry,
    ];

    mergedGeometry.current = mergeBufferGeometries(geometries);
    setIsGeometryReady(true);
  }, [nodes]);

  // (2)
  useEffect(() => {
    if (isGeometryReady && meshRef.current) {
      for (let i = 0; i < count; i++) {
        dummy.scale.set(0.02, 0.02, 0.02);
        const x = Math.random() * (endX - startX) + startX;
        const z = Math.random() * (endZ - startZ) + startZ;
        dummy.position.set(x, y, z); // 각 인스턴스의 위치 설정
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [dummy, isGeometryReady]);

  return (
    <group>
      {mergedGeometry.current && (
        <instancedMesh
          ref={meshRef}
          args={[mergedGeometry.current, materials._4, count]}
          castShadow
        />
      )}
    </group>
  );
}

useGLTF.preload("/models/Grass2.glb");

/*
https://poly.pizza/m/3tyh15Fbmsx
Tuft of grass by Poly by Google [CC-BY] via Poly Pizza
*/

export function Grass3({
  count,
  x,
  y,
  z,
}: {
  count: number;
  x: [number, number];
  y: number;
  z: [number, number];
}) {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Grass3.glb");
  const [startX, endX] = x;
  const [startZ, endZ] = z;
  const mergedGeometry = useRef<any>();
  const meshRef = useRef<any>();
  const [isGeometryReady, setIsGeometryReady] = useState(false);
  const dummy = useMemo(() => new Object3D(), []);

  // (1)
  useEffect(() => {
    const geometries = [
      nodes.Plane002.geometry,
      nodes.Plane003.geometry,
      nodes.Plane004.geometry,
      nodes.Plane005.geometry,
      nodes.Plane006.geometry,
      nodes.Plane007.geometry,
      nodes.Plane008.geometry,
      nodes.Plane009.geometry,
      nodes.Plane010.geometry,
      nodes.Plane011.geometry,
      nodes.Plane012.geometry,
      nodes.Plane013.geometry,
      nodes.Plane014.geometry,
      nodes.Plane015.geometry,
      nodes.Plane016.geometry,
      nodes.Plane017.geometry,
      nodes.Plane018.geometry,
      nodes.Plane019.geometry,
      nodes.Plane020.geometry,
      nodes.Plane021.geometry,
      nodes.Plane022.geometry,
      nodes.Plane023.geometry,
      nodes.Plane024.geometry,
      nodes.Plane025.geometry,
      nodes.Plane026.geometry,
      nodes.Plane027.geometry,
      nodes.Plane028.geometry,
      nodes.Plane029.geometry,
    ];

    mergedGeometry.current = mergeBufferGeometries(geometries);
    setIsGeometryReady(true);
  }, [nodes]);

  // (2)
  useEffect(() => {
    if (isGeometryReady && meshRef.current) {
      for (let i = 0; i < count; i++) {
        dummy.scale.set(0.0025, 0.0025, 0.0025);
        const x = Math.random() * (endX - startX) + startX;
        const z = Math.random() * (endZ - startZ) + startZ;
        dummy.position.set(x, y, z); // 각 인스턴스의 위치 설정
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [dummy, isGeometryReady]);

  return (
    <group>
      {mergedGeometry.current && (
        <instancedMesh
          ref={meshRef}
          args={[mergedGeometry.current, materials._crayfishdiffuse, count]}
          castShadow
        />
      )}
    </group>
  );
}

useGLTF.preload("/models/Grass3.glb");

/*
https://poly.pizza/m/9-z6UG6rQ67
Grass #2 by Tomáš Bayer [CC-BY] via Poly Pizza
*/

export function Grass4({
  count,
  x,
  y,
  z,
}: {
  count: number;
  x: [number, number];
  y: number;
  z: [number, number];
}) {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Grass4.glb");
  const [startX, endX] = x;
  const [startZ, endZ] = z;
  const mergedGeometry = useRef<any>();
  const meshRef = useRef<any>();
  const [isGeometryReady, setIsGeometryReady] = useState(false);
  const dummy = useMemo(() => new Object3D(), []);

  // (1)
  useEffect(() => {
    const geometries = [
      nodes.Mesh1_ElwFor_Grass02_C01_1_Model.geometry,
      nodes.Mesh2_ElwFor_Grass02_C01_2_Model.geometry,
      nodes.Mesh3_ElwFor_Grass02_C01_3_Model.geometry,
      nodes.Mesh4_ElwFor_Grass02_C01_4_Model.geometry,
      nodes.Mesh5_ElwFor_Grass02_C01_5_Model.geometry,
      nodes.Mesh6_ElwFor_Grass02_C01_6_Model.geometry,
      nodes.Mesh7_ElwFor_Grass02_C01_7_Model.geometry,
      nodes.Mesh8_ElwFor_Grass02_C01_8_Model.geometry,
      nodes.Mesh9_ElwFor_Grass02_C01_9_Model.geometry,
      nodes.Mesh10_ElwFor_Grass02_C01_10_Model.geometry,
      nodes.Mesh11_ElwFor_Grass02_C01_11_Model.geometry,
    ];

    mergedGeometry.current = mergeBufferGeometries(geometries);
    setIsGeometryReady(true);
  }, [nodes]);

  // (2)
  useEffect(() => {
    if (isGeometryReady && meshRef.current) {
      for (let i = 0; i < count; i++) {
        dummy.scale.set(0.05, 0.05, 0.05);
        const x = Math.random() * (endX - startX) + startX;
        const z = Math.random() * (endZ - startZ) + startZ;
        dummy.position.set(x, y, z); // 각 인스턴스의 위치 설정
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [dummy, isGeometryReady]);
  return (
    <group>
      {mergedGeometry.current && (
        <instancedMesh
          ref={meshRef}
          args={[mergedGeometry.current, materials._4, count]}
          castShadow
        />
      )}
    </group>
  );
}

useGLTF.preload("/models/Grass4.glb");
