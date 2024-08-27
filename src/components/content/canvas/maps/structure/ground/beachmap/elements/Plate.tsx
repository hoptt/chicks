/*
https://poly.pizza/m/3QLOU0uIv0q
Plate by Zoe XR [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";
import { useRef, useState, useMemo, useEffect } from "react";
import { Object3D } from "three";
import { mergeBufferGeometries } from "three-stdlib";

export function Plate() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Plate.glb");

  const positions = [
    [-10, -0.3, 0],
    [-7, -1.6, -11],
    [8, -1.7, -11],
    [8, 0.2, 6],
    [12, -0.1, 3],
  ];
  const rotationZ = [0.7, 3, 1, 0.5, 0];
  const rotationX = [-1, -1.3, -1.57, -1.57, -3];

  const mergedGeometry = useRef<any>();
  const meshRef = useRef<any>();
  const [isGeometryReady, setIsGeometryReady] = useState(false);
  const dummy = useMemo(() => new Object3D(), []);

  // (1)
  useEffect(() => {
    const geometries = [nodes.group1515085826.geometry];

    mergedGeometry.current = mergeBufferGeometries(geometries);
    setIsGeometryReady(true);
  }, []);

  // (2)
  useEffect(() => {
    if (isGeometryReady && meshRef.current) {
      for (let i = 0; i < positions.length; i++) {
        dummy.rotation.set(rotationX[i], 0, rotationZ[i]);

        dummy.scale.set(0.15, 0.15, 0.15);
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
    <group position={[0, 2, 0]}>
      {isGeometryReady && (
        <instancedMesh
          ref={meshRef}
          args={[mergedGeometry.current, materials.mat21, positions.length]}
          castShadow
        />
      )}
    </group>
  );
}

useGLTF.preload("/models/Plate.glb");
