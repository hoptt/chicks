/*
https://poly.pizza/m/RtLRqYjfMs
Rock by Quaternius
*/

import { useGLTF } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import { MeshStandardMaterial, Object3D } from "three";
import { mergeBufferGeometries } from "three-stdlib";

export function Rock() {
  const materials = useMemo(
    () => new MeshStandardMaterial({ color: "#969696" }),
    []
  );
  const { nodes }: { nodes: any; materials: any } = useGLTF("/models/Rock.glb");

  const positions = [
    [-14, 1.55, 5],
    [-15, 1, 6.5],
    [-17, 0.9, 0],
    [-16, 0.9, -3],
    [-13, 0.9, -8],
    [-10, 0.7, -10],
  ];
  const rotationZ = [0.7, 0.5, 0.9, 0, 0.5, 1];

  const mergedGeometry = useRef<any>();
  const meshRef = useRef<any>();
  const [isGeometryReady, setIsGeometryReady] = useState(false);
  const dummy = useMemo(() => new Object3D(), []);

  // (1)
  useEffect(() => {
    const geometries = [nodes.Resource_Rock_1.geometry];

    mergedGeometry.current = mergeBufferGeometries(geometries);
    setIsGeometryReady(true);
  }, []);

  // (2)
  useEffect(() => {
    if (isGeometryReady && meshRef.current) {
      for (let i = 0; i < positions.length; i++) {
        dummy.rotation.set(-Math.PI / 2, 0, rotationZ[i]);

        dummy.scale.set(800, 800, 800);
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
    <group rotation-x={-0.1}>
      {isGeometryReady && (
        <instancedMesh
          ref={meshRef}
          args={[mergedGeometry.current, materials, positions.length]}
          castShadow
        />
      )}
    </group>
  );
}

useGLTF.preload("/models/Rock.glb");

/*
https://poly.pizza/m/fM90QFMNtS
Rock by Zsky [CC-BY] via Poly Pizza
*/

export function Rock2() {
  const { nodes }: { nodes: any; materials: any } =
    useGLTF("/models/Rock2.glb");
  const materials = useMemo(
    () => new MeshStandardMaterial({ color: "#969696" }),
    []
  );

  const positions = [
    [-12, 1.55, 0],
    [-1, 1, 6.5],
    [15, 0.9, -5],
    [-1, 0.7, -10],
  ];

  const mergedGeometry = useRef<any>();
  const meshRef = useRef<any>();
  const [isGeometryReady, setIsGeometryReady] = useState(false);
  const dummy = useMemo(() => new Object3D(), []);

  // (1)
  useEffect(() => {
    const geometries = [nodes.Rock4.geometry];

    mergedGeometry.current = mergeBufferGeometries(geometries);
    setIsGeometryReady(true);
  }, []);

  // (2)
  useEffect(() => {
    if (isGeometryReady && meshRef.current) {
      for (let i = 0; i < positions.length; i++) {
        dummy.rotation.set(0, Math.random() * 2, 0);

        dummy.scale.set(1, 1, 1);
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
    <group rotation-x={-0.1}>
      {/* <mesh geometry={nodes.Rock4.geometry} material={materials.Rock4} /> */}
      {isGeometryReady && (
        <instancedMesh
          ref={meshRef}
          args={[mergedGeometry.current, materials, positions.length]}
          castShadow
          receiveShadow
        />
      )}
    </group>
  );
}

useGLTF.preload("/models/Rock2.glb");
