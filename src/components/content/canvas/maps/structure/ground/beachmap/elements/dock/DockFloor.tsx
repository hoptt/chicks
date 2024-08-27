/*
https://poly.pizza/m/YAS4fY6UL1
Dock by Quaternius
*/

import { useGLTF } from "@react-three/drei";
import { useRef, useState, useMemo, useEffect, memo } from "react";
import { MeshStandardMaterial, Object3D } from "three";
import { mergeBufferGeometries } from "three-stdlib";

export const DockFloor = memo(function DockFloor() {
  const { nodes }: { nodes: any; materials: any } = useGLTF(
    "/models/DockFloor.glb"
  );
  const materials = useMemo(
    () => new MeshStandardMaterial({ color: "#855f23" }),
    []
  );
  const positions = [
    [13.4, -0.2, -20],
    [13.4, -0.2, -23.1],
    [13.4, -0.2, -26.2],
    [13.4, -0.2, -29.3],

    [3, -0.2, -20],
    [5.6, -0.2, -20],
    [8.2, -0.2, -20],
    [10.8, -0.2, -20],

    [3, -0.2, -23.1],
    [5.6, -0.2, -23.1],
    [8.2, -0.2, -23.1],
    [10.8, -0.2, -23.1],

    [3, -0.2, -26.2],
    [5.6, -0.2, -26.2],
    [8.2, -0.2, -26.2],
    [10.8, -0.2, -26.2],

    [3, -0.2, -29.3],
    [5.6, -0.2, -29.3],
    [8.2, -0.2, -29.3],
    [10.8, -0.2, -29.3],
  ];
  const mergedGeometry = useRef<any>();
  const meshRef = useRef<any>();
  const [isGeometryReady, setIsGeometryReady] = useState(false);
  const dummy = useMemo(() => new Object3D(), []);

  // (1)
  useEffect(() => {
    const geometries = [nodes.Houses_FirstAge_3_Level1_1.geometry];

    mergedGeometry.current = mergeBufferGeometries(geometries);
    setIsGeometryReady(true);
  }, []);

  // (2)
  useEffect(() => {
    if (isGeometryReady && meshRef.current) {
      for (let i = 0; i < positions.length; i++) {
        dummy.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
        dummy.scale.set(500, 500, 300);

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
          args={[mergedGeometry.current, materials, positions.length]}
        />
      )}
    </group>
  );
});

useGLTF.preload("/models/DockFloor.glb");
