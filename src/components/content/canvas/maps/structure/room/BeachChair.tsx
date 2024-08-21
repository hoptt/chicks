/*
https://poly.pizza/m/9TN4PyhWvz1
Beach chair by Poly by Google [CC-BY] via Poly Pizza
*/

import { socket } from "@/sockets/clientSocket";
import { ObjectsAtom } from "@/store/ObjectsAtom";
import { MeAtom } from "@/store/PlayersAtom";
import { useGLTF } from "@react-three/drei";
import { memo } from "react";
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
  const me = useRecoilValue(MeAtom);
  const chair = objects.find((item) => item.name === "chair")!
    .value as unknown as {
    id: number;
    player: string | undefined;
    position: [number, number, number];
  }[];
  const onClick = () => {
    const isStanding = chair.findIndex((a) => a.player === me?.id) === -1;
    const isNotUse = chair.find((a) => a.id === type)?.player === undefined;
    if (isStanding && isNotUse) socket.emit("chair", { type, position });
  };
  return (
    <group
      position={position}
      scale={0.007}
      rotation={rotation}
      onClick={onClick}
    >
      <mesh
        geometry={nodes.Beach_Chair.geometry}
        material={materials.lambert3SG}
      />
    </group>
  );
});

useGLTF.preload("/models/BeachChair.glb");
