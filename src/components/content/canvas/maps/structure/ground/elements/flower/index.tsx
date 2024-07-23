/*
https://poly.pizza/m/5Cvg9NTvlg2
Dandelions by Jarlan Perez [CC-BY] via Poly Pizza
*/

import { Merged, useGLTF } from "@react-three/drei";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Object3D } from "three";
import { mergeBufferGeometries } from "three-stdlib";

type Props = {
  count: number;
  x: [number, number];
  y: number;
  z: [number, number];
};
export function Dandelions({ count, x, y, z }: Props) {
  const { nodes, materials } = useGLTF("/models/Dandelions.glb");
  const [startX, endX] = x;
  const [startZ, endZ] = z;

  const meshes = useMemo(
    () => ({
      Dandelions1: nodes["Node-Mesh"],
      Dandelions2: nodes["Node-Mesh_1"],
    }),
    [nodes]
  );

  const position = useMemo(() => {
    let position1: [number, number, number][] = [];

    for (let i = 1; i <= count; i++) {
      const x = Math.random() * (endX - startX) + startX;
      const z = Math.random() * (endZ - startZ) + startZ;
      position1.push([x, y, z]);
    }

    return position1;
  }, []);
  return (
    <group>
      <Merged castShadow meshes={meshes}>
        {(mesh) => {
          return (
            <>
              {Array.from({ length: count }).map((_, idx) => (
                <Fragment key={idx}>
                  <group position={position[idx]} scale={5}>
                    <mesh.Dandelions1 material={materials.mat21} />
                    <mesh.Dandelions2 material={materials.mat9} />
                  </group>
                </Fragment>
              ))}
            </>
          );
        }}
      </Merged>
    </group>
  );
}

useGLTF.preload("/models/Dandelions.glb");

/*
https://poly.pizza/m/dYQFgjU5Eqx
Desert marigold by Poly by Google [CC-BY] via Poly Pizza
*/

export function Marigold() {
  const count = 800;
  const { nodes, materials } = useGLTF("/models/Marigold.glb");

  const mergedGeometry = useRef();
  const meshRef = useRef();
  const [isGeometryReady, setIsGeometryReady] = useState(false);
  const dummy = useMemo(() => new Object3D(), []);

  // (1)
  useEffect(() => {
    const geometries = [nodes.DesertMarigold_mesh.geometry];

    mergedGeometry.current = mergeBufferGeometries(geometries);
    setIsGeometryReady(true);
  }, [nodes]);

  // (2)
  useEffect(() => {
    if (isGeometryReady && meshRef.current) {
      const radius = 5;
      for (let i = 0; i < count; i++) {
        dummy.scale.set(0.1, 0.1, 0.1);
        // const x = (Math.random() - 0.5) * 1e1;
        // const z = (Math.random() - 0.5) * 1e1;
        const angle = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * radius;

        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;
        dummy.position.set(x, 0, z); // 각 인스턴스의 위치 설정
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
          args={[mergedGeometry.current, materials.DesertMarigold_mat, count]}
          castShadow
        />
      )}
      {/* <mesh
        geometry={nodes.DesertMarigold_mesh.geometry}
        material={materials.DesertMarigold_mat}
      /> */}
    </group>
  );
}

useGLTF.preload("/models/Marigold.glb");
