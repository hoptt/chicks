/*
https://poly.pizza/m/0-_GjMekeob
Lily pad by Poly by Google [CC-BY] via Poly Pizza
*/

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { Vector3 } from "three";
export function Lilypad() {
  const x = -5,
    z = -17,
    y = 0.55,
    width = 3,
    height = 3;
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/Lilypad.glb"
  );
  const ref = useRef<any>();
  const startX = width / 2 + x;
  const endX = -width + startX;

  const startZ = height / 2 + z;
  const endZ = -height + startZ;

  const rdnX = Math.random() * (endX - startX) + startX;
  const rdnZ = Math.random() * (endZ - startZ) + startZ;
  const newPos = useMemo(() => new Vector3(rdnX, y, rdnZ), []);
  const [rdmPos, setRdmPos] = useState(() => newPos);

  useFrame(() => {
    /* 
    정사각형 틀에서 랜덤 좌표가 찍히고
    해당 방향으로 연못이 이동하고 도착하면 새로운 좌표로 다시 이동
    */
    if (!ref.current) return;
    if (ref.current.position.distanceTo(rdmPos) > 0.1) {
      const distance = ref.current.position
        .clone()
        .sub(rdmPos)
        .normalize()
        .multiplyScalar(0.0025);
      ref.current.position.sub(distance);
    } else {
      const rdnX = Math.random() * (endX - startX) + startX;
      const rdnZ = Math.random() * (endZ - startZ) + startZ;
      setRdmPos(new Vector3(rdnX, y, rdnZ));
    }
  });

  return (
    <group ref={ref} position={[x, y, z]}>
      <mesh
        geometry={nodes.Lilypad_mesh.geometry}
        material={materials.blinn1SG}
        scale={0.075}
        castShadow
        receiveShadow
      />
    </group>
  );
}

useGLTF.preload("/models/Lilypad.glb");
