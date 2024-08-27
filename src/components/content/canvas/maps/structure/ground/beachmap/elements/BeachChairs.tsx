/*
https://poly.pizza/m/9TN4PyhWvz1
Beach chair by Poly by Google [CC-BY] via Poly Pizza
*/

import { socket } from "@/sockets/clientSocket";
import { IsInsideBeachRugAtom } from "@/store/InteractionAtom";
import { ObjectsAtom } from "@/store/ObjectsAtom";
import { MeAtom } from "@/store/PlayersAtom";
import { Html, Merged, useCursor, useGLTF } from "@react-three/drei";
import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
type Props = {
  position: [number, number, number];
  rotation?: [number, number, number];
  type: number;
  mesh: any;
  materials: any;
};

const BeachChair = ({
  position,
  type,
  rotation = [0, 0, 0],
  mesh,
  materials,
}: Props) => {
  const objects = useRecoilValue(ObjectsAtom);
  const isInsideBeachRug = useRecoilValue(IsInsideBeachRugAtom);
  const [isHover, setIsHover] = useState(false);
  const me = useRecoilValue(MeAtom);
  const chair = objects.find((item) => item.name === "chair")!
    .value as unknown as {
    id: number;
    player: string | undefined;
    position: [number, number, number];
  }[];
  const isStanding = chair.findIndex((a) => a.player === me?.id) === -1;
  const isNotUse = chair.find((a) => a.id === type)?.player === undefined;
  const onClick = () => {
    if (isStanding && isNotUse && isInsideBeachRug)
      socket.emit("chair", { type, position });
  };
  useCursor(isHover);
  return (
    <group
      position={position}
      scale={0.007}
      rotation={rotation}
      onClick={onClick}
      onPointerEnter={() => {
        if (!isStanding || !isInsideBeachRug || !isNotUse) return;
        setIsHover(true);
      }}
      onPointerOut={() => {
        setIsHover(false);
      }}
    >
      <mesh.Beach_Chair material={materials} castShadow />
      {isInsideBeachRug && isStanding && isNotUse && (
        <Html
          style={{ cursor: "pointer", pointerEvents: "none", width: "25px" }}
        >
          <img
            alt="클릭"
            src="/images/mouse_click.webp"
            style={{ transform: "translate(-50%,-30px)" }}
          />
        </Html>
      )}
    </group>
  );
};

export const BeachChairs = () => {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/BeachChair.glb"
  );
  const meshes = useMemo(
    () => ({
      Beach_Chair: nodes.Beach_Chair,
    }),
    []
  );

  return (
    <>
      <Merged receiveShadow meshes={meshes}>
        {(mesh: any) => {
          return (
            <>
              <BeachChair
                position={[7, 2, 0]}
                type={1}
                rotation={[0, Math.PI, 0]}
                mesh={mesh}
                materials={materials.lambert3SG}
              />
              <BeachChair
                position={[9, 2, 0]}
                type={2}
                rotation={[0, Math.PI, 0]}
                mesh={mesh}
                materials={materials.lambert3SG}
              />
              <BeachChair
                position={[11, 1.9, -2]}
                type={3}
                rotation={[0, -Math.PI / 1.8, 0]}
                mesh={mesh}
                materials={materials.lambert3SG}
              />
              <BeachChair
                position={[11.5, 1.7, -4]}
                type={4}
                rotation={[0, -Math.PI / 1.8, 0]}
                mesh={mesh}
                materials={materials.lambert3SG}
              />
            </>
          );
        }}
      </Merged>
    </>
  );
};

useGLTF.preload("/models/BeachChair.glb");
