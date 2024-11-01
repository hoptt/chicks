/*
https://poly.pizza/m/9TN4PyhWvz1
Beach chair by Poly by Google [CC-BY] via Poly Pizza
*/

import { socket } from "@/sockets/clientSocket";
import { IsInsideBeachRugAtom } from "@/store/InteractionAtom";
import { ObjectsAtom } from "@/store/ObjectsAtom";
import { MeAtom } from "@/store/PlayersAtom";
import { Html, Merged, useCursor, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
type Props = {
  position: [number, number, number];
  rotation?: [number, number, number];
  type: number;
  mesh: any;
  chair: {
    id: number;
    player: string | undefined;
    position: [number, number, number];
  }[];
  materials: any;
  seatingAvailable: boolean;
};

const BeachChair = ({
  position,
  type,
  rotation = [0, 0, 0],
  mesh,
  chair,
  materials,
  seatingAvailable,
}: Props) => {
  const [isHover, setIsHover] = useState(false);
  const isNotSomeoneSeated =
    chair.find((a) => a.id === type)?.player === undefined;
  const onClick = () => {
    if (seatingAvailable && isNotSomeoneSeated)
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
        if (!seatingAvailable || !isNotSomeoneSeated) return;
        setIsHover(true);
      }}
      onPointerOut={() => {
        setIsHover(false);
      }}
    >
      <mesh.Beach_Chair material={materials} castShadow />
      {seatingAvailable && isNotSomeoneSeated && (
        <Html
          style={{ cursor: "pointer", pointerEvents: "none", width: "25px" }}
        >
          <img
            alt="클릭"
            src="/images/mouse_click.webp"
            style={{ transform: "translate(-50%,-30px)" }}
          />
          <span
            className="shorten__key"
            style={{
              transform: "translate(-50%, -95px)",
            }}
          >
            [ F ]
          </span>
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
  const objects = useRecoilValue(ObjectsAtom);
  const me = useRecoilValue(MeAtom);
  const isInsideBeachRug = useRecoilValue(IsInsideBeachRugAtom);
  const chair = objects.find((item) => item.name === "chair")!
    .value as unknown as {
    id: number;
    player: string | undefined;
    position: [number, number, number];
  }[];
  const isStanding = chair.findIndex((a) => a.player === me?.id) === -1;
  const emptyChair = chair.filter((a) => !a.player)[0];
  const positions: [number, number, number][] = [
    [7, 2, 0],
    [9, 2, 0],
    [11, 1.9, -2],
    [11.5, 1.7, -4],
  ];
  const seatingAvailable = isStanding && emptyChair && isInsideBeachRug;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key.toUpperCase() === "F") {
      if (seatingAvailable) {
        socket.emit("chair", {
          type: emptyChair.id,
          position: positions[emptyChair.id - 1],
        });
        window.removeEventListener("keydown", handleKeyDown);
      }
    }
  };

  useEffect(() => {
    if (!isInsideBeachRug) return;

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isInsideBeachRug, emptyChair]);

  return (
    <>
      <Merged receiveShadow meshes={meshes}>
        {(mesh: any) => {
          return (
            <>
              <BeachChair
                position={positions[0]}
                type={1}
                rotation={[0, Math.PI, 0]}
                mesh={mesh}
                chair={chair}
                materials={materials.lambert3SG}
                seatingAvailable={seatingAvailable}
              />
              <BeachChair
                position={positions[1]}
                type={2}
                rotation={[0, Math.PI, 0]}
                mesh={mesh}
                chair={chair}
                materials={materials.lambert3SG}
                seatingAvailable={seatingAvailable}
              />
              <BeachChair
                position={positions[2]}
                type={3}
                rotation={[0, -Math.PI / 1.8, 0]}
                mesh={mesh}
                chair={chair}
                materials={materials.lambert3SG}
                seatingAvailable={seatingAvailable}
              />
              <BeachChair
                position={positions[3]}
                type={4}
                rotation={[0, -Math.PI / 1.8, 0]}
                mesh={mesh}
                chair={chair}
                materials={materials.lambert3SG}
                seatingAvailable={seatingAvailable}
              />
            </>
          );
        }}
      </Merged>
    </>
  );
};

useGLTF.preload("/models/BeachChair.glb");
