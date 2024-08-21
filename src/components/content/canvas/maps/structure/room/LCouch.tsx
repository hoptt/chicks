/*
https://poly.pizza/m/1kwsjhpY84
L Couch by Quaternius
*/

import { socket } from "@/sockets/clientSocket";
import { IsInsideCouchAtom } from "@/store/InteractionAtom";
import { ObjectsAtom } from "@/store/ObjectsAtom";
import { MeAtom } from "@/store/PlayersAtom";
import { Html, useCursor, useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export function LCouch() {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/models/LCouch.glb");
  const me = useRecoilValue(MeAtom);
  const isInsideCouch = useRecoilValue(IsInsideCouchAtom);
  const [isHover, setIsHover] = useState(false);
  const objects = useRecoilValue(ObjectsAtom);
  const couch = objects.find((item) => item.name === "couch")!
    .value as unknown as {
    id: number;
    player: string | undefined;
    position: [number, number, number];
  }[];
  const isStanding = couch.findIndex((a) => a.player === me?.id) === -1;
  const onClick = (e: ThreeEvent<MouseEvent>) => {
    /**
     * 쇼파는 1,2,3번 자리가 있음
     * 자리는 소파 클릭 시 남은 자리중 랜덤으로 선택되어 앉아짐
     * 각 자리에 중복해서 앉지 못함
     */

    e.stopPropagation();

    let availableNumbers = couch
      .map((a, idx) => {
        if (a.player) return a.player;
        else return idx + 1;
      })
      .filter((a) => typeof a === "number");

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const rdmNum = availableNumbers[randomIndex];
    availableNumbers.splice(randomIndex, 1);

    const positions = [
      [11, 4.2, -34],
      [12.5, 4.2, -34],
      [13.5, 4.2, -34],
    ];

    const isNotUse = couch.find((a) => a.id === rdmNum)?.player === undefined;
    if (isStanding && isNotUse && isInsideCouch)
      socket.emit("couch", { type: rdmNum, position: positions[rdmNum - 1] });
  };
  useCursor(isHover);

  useEffect(() => {
    materials.Couch_BeigeDark.color.set("#c8c8c8");
    materials.Couch_Beige.color.set("#666c70");
  }, []);
  return (
    <group
      position={[12, 4.2, -34]}
      rotation={[-Math.PI / 2, 0, -Math.PI]}
      scale={[80, 70, 70]}
      onClick={onClick}
      onPointerEnter={() => {
        if (!isStanding || !isInsideCouch) return;
        setIsHover(true);
      }}
      onPointerOut={() => {
        setIsHover(false);
      }}
    >
      {isInsideCouch && isStanding && (
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
      <mesh
        geometry={nodes.Couch_L_1.geometry}
        material={materials.Couch_BeigeDark}
        castShadow
      />
      <mesh
        geometry={nodes.Couch_L_2.geometry}
        material={materials.Couch_Beige}
      />
    </group>
  );
}

useGLTF.preload("/models/LCouch.glb");
