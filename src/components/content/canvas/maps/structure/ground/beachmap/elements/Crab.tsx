/*
https://poly.pizza/m/2DgM36qZW2u
Crab by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";
import { useRef, useState, useMemo, useEffect } from "react";
import { Object3D } from "three";
import { mergeBufferGeometries } from "three-stdlib";

export function Crab() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/Crab.glb");

  const positions = [
    [-13, 1.85, 2],
    [-10, 0.9, -8],
    [-11, 3.5, -10],
  ];
  const rotationY = [1, 0.5, 1];
  const rotationZ = [0, 0, 0.5];

  const mergedGeometry = useRef<any>();
  const meshRef = useRef<any>();
  const [isGeometryReady, setIsGeometryReady] = useState(false);
  const dummy = useMemo(() => new Object3D(), []);

  // (1)
  useEffect(() => {
    const geometries = [nodes.Geo_Crab.geometry];

    mergedGeometry.current = mergeBufferGeometries(geometries);
    setIsGeometryReady(true);
  }, []);

  // (2)
  useEffect(() => {
    if (isGeometryReady && meshRef.current) {
      for (let i = 0; i < positions.length; i++) {
        dummy.rotation.set(0, rotationY[i], rotationZ[i]);
        dummy.scale.set(0.005, 0.005, 0.005);

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
          args={[
            mergedGeometry.current,
            materials.lambert2SG,
            positions.length,
          ]}
          castShadow
        />
      )}
    </group>
  );
}

useGLTF.preload("/models/Crab.glb");
