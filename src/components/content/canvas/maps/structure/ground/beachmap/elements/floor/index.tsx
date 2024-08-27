import { useBox, usePlane } from "@react-three/cannon";
import { useEffect, useMemo, useRef, useState } from "react";
import { ExtrudeGeometry, MeshStandardMaterial, Object3D, Shape } from "three";
import { mergeBufferGeometries } from "three-stdlib";

export function SandFloor() {
  const x = 0;
  const z = 0;
  const width = 100;
  const height = 50;
  const [ref] = usePlane(() => ({
    type: "Static",
    material: "ground",
    rotation: [-Math.PI / 2, 0, 0],
    position: [x, 0, z],
  }));
  return (
    <group ref={ref as any}>
      <mesh castShadow receiveShadow>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#dbb990" />
      </mesh>
    </group>
  );
}

export function Sand() {
  const x = 0;
  const z = 15;
  const width = 100;
  const height = 20;
  const [ref] = useBox(() => ({
    type: "Static",
    material: "ground",
    args: [width, 1, height],
    rotation: [-0.2, 0, 0],
    position: [x, 3, z],
  }));

  const x2 = 0;
  const z2 = 10;
  const width2 = 100;
  const height2 = 10;
  const [ref2] = useBox(() => ({
    type: "Static",
    material: "ground",
    args: [width2, 1, height2],
    rotation: [-0.04, 0, 0],
    position: [x2, 2, z2],
  }));

  const x3 = 0;
  const z3 = -1;
  const width3 = 100;
  const height3 = 25;
  const [ref3] = useBox(() => ({
    type: "Static",
    material: "ground",
    args: [width3, 1, height3],
    rotation: [-0.1, 0, 0],
    position: [x3, 1, z3],
  }));

  const sandShape2 = new Shape();
  sandShape2.moveTo(-3, -0.2);
  sandShape2.lineTo(-1, 0.2);
  sandShape2.lineTo(0, 0.2);
  sandShape2.lineTo(1.5, 0.5);
  sandShape2.lineTo(2, 0.3);
  sandShape2.lineTo(-0.2, -0.1);
  sandShape2.lineTo(-1.5, -0.1);
  sandShape2.lineTo(-2, -0.2);

  const geometry2 = new ExtrudeGeometry(sandShape2, {
    depth: 0.1,
    bevelEnabled: false,
  });

  const sandShape3 = new Shape();
  sandShape3.moveTo(-3, -0.2);
  sandShape3.lineTo(-1, 0.2);
  sandShape3.lineTo(0, 0.2);
  sandShape3.lineTo(1.5, 0.5);
  sandShape3.lineTo(5, 0.3);
  sandShape3.lineTo(5.3, 0.1);
  sandShape3.lineTo(2, 0.2);
  sandShape3.lineTo(-0.2, -0.1);
  sandShape3.lineTo(-1.5, -0.1);
  sandShape3.lineTo(-2, -0.2);

  const geometry3 = new ExtrudeGeometry(sandShape3, {
    depth: 0.1,
    bevelEnabled: false,
  });

  const sandShape4 = new Shape();
  sandShape4.moveTo(-2.3, -0.2);
  sandShape4.moveTo(-2.1, 0.2);
  sandShape4.lineTo(-1.8, 0.2);
  sandShape4.lineTo(-1, -0.3);
  sandShape4.lineTo(0.6, 0.3);
  sandShape4.lineTo(0.8, 0.1);
  sandShape4.lineTo(0.6, 0);
  sandShape4.lineTo(-1, -0.9);
  sandShape4.lineTo(-2, 0);
  sandShape4.lineTo(-2.3, -0.2);

  const geometry4 = new ExtrudeGeometry(sandShape4, {
    depth: 0.1,
    bevelEnabled: false,
  });
  const materials = useMemo(
    () => new MeshStandardMaterial({ color: "#d1ae7f" }),
    []
  );
  const sandShape = new Shape();
  sandShape.moveTo(-2.3, -0.2);
  sandShape.moveTo(-2.1, 0.2);
  sandShape.lineTo(-1.8, 0.2);
  sandShape.lineTo(0, -0.2);
  sandShape.lineTo(0.6, 0.2);
  sandShape.lineTo(0.8, 0.1);
  sandShape.lineTo(0.6, 0);
  sandShape.lineTo(0, -0.6);
  sandShape.lineTo(-2, 0);
  sandShape.lineTo(-2.3, -0.2);
  const geometry = new ExtrudeGeometry(sandShape, {
    depth: 0.1,
    bevelEnabled: false,
  });

  return (
    <>
      <group ref={ref as any}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[width, 1, height]} />
          <meshStandardMaterial color="#dbb990" />
        </mesh>
      </group>
      <group ref={ref2 as any}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[width2, 1, height2]} />
          <meshStandardMaterial color="#dbb990" />
        </mesh>
      </group>
      <group ref={ref3 as any}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[width3, 1, height3]} />
          <meshStandardMaterial color="#dbb990" />
        </mesh>
      </group>
      <SandLayer
        count={10}
        x={[50, -50]}
        z={[10, -12]}
        geometry={geometry}
        materials={materials}
      />
      <SandLayer
        count={100}
        x={[50, -50]}
        z={[10, -12]}
        geometry={geometry2}
        materials={materials}
      />
      <SandLayer
        count={50}
        x={[50, -50]}
        z={[10, -12]}
        geometry={geometry3}
        materials={materials}
      />
      <SandLayer
        count={10}
        x={[50, -50]}
        z={[10, -12]}
        geometry={geometry4}
        materials={materials}
      />
    </>
  );
}

type Props = {
  count: number;
  x: [number, number];
  z: [number, number];
  geometry: ExtrudeGeometry;
  materials: MeshStandardMaterial;
};
const SandLayer = ({ count, geometry, materials, x, z }: Props) => {
  const [startX, endX] = x;
  const [startZ, endZ] = z;

  const mergedGeometry = useRef<any>();
  const meshRef = useRef<any>();
  const [isGeometryReady, setIsGeometryReady] = useState(false);
  const dummy = useMemo(() => new Object3D(), []);

  // (1)
  useEffect(() => {
    const geometries = [geometry];

    mergedGeometry.current = mergeBufferGeometries(geometries);
    setIsGeometryReady(true);
  }, []);

  // (2)
  useEffect(() => {
    if (isGeometryReady && meshRef.current) {
      for (let i = 0; i < count; i++) {
        dummy.rotation.set(-Math.PI / 2, 0, 0);

        dummy.scale.set(
          Math.max(Math.random(), 0.5),
          Math.max(Math.random(), 0.5),
          Math.max(Math.random(), 0.5)
        );
        const x = Math.random() * (endX - startX) + startX;
        const z = Math.random() * (endZ - startZ) + startZ;
        dummy.position.set(x, 1.55, z); // 각 인스턴스의 위치 설정
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
          args={[mergedGeometry.current, materials, count]}
          receiveShadow
        />
      )}
    </group>
  );
};
