/*
https://poly.pizza/m/9TN4PyhWvz1
Beach chair by Poly by Google [CC-BY] via Poly Pizza
*/

import { socket } from "@/sockets/clientSocket";
import { IsInsideRooftopRugAtom } from "@/store/InteractionAtom";
import { ObjectsAtom } from "@/store/ObjectsAtom";
import { MeAtom } from "@/store/PlayersAtom";
import { Html, useCursor, useGLTF } from "@react-three/drei";
import { memo, useState } from "react";
import { useRecoilValue } from "recoil";
type Props = {
  position: [number, number, number];
  rotation?: [number, number, number];
  type: number;
};

export const BeachChair = memo(function BeachChair({
  position,
  type,
  rotation = [0, 0, 0],
}: Props) {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/BeachChair.glb"
  );
  const objects = useRecoilValue(ObjectsAtom);
  const isInsideRooftopRug = useRecoilValue(IsInsideRooftopRugAtom);
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
    if (isStanding && isNotUse && isInsideRooftopRug)
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
        if (!isStanding || !isInsideRooftopRug || !isNotUse) return;
        setIsHover(true);
      }}
      onPointerOut={() => {
        setIsHover(false);
      }}
    >
      <mesh
        geometry={nodes.Beach_Chair.geometry}
        material={materials.lambert3SG}
      />
      {isInsideRooftopRug && isStanding && isNotUse && (
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
});

useGLTF.preload("/models/BeachChair.glb");
