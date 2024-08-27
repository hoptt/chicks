import { PlayersAtom } from "@/store/PlayersAtom";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import Player from "../../../player/Player";
import { ChicksFlyNaming } from "../../text";
import { BeachBall } from "./elements/BeachBall";
import { BeachChairs } from "./elements/BeachChairs";
import { BeachParasol } from "./elements/BeachParasol";
import { Boat } from "./elements/Boat";
import { BoomBox } from "./elements/BoomBox";
import { Crab } from "./elements/Crab";
import { DesertPebble } from "./elements/DesertPebble";
import Dock from "./elements/dock";
import { Sand, SandFloor } from "./elements/floor";
import { Ladder } from "./elements/Ladder";
import { Log } from "./elements/Log";
import { Log2 } from "./elements/Log2";
import { Ocean } from "./elements/ocean";
import { PalmTree } from "./elements/PalmTree";
import { ParkInfoBoard } from "./elements/ParkInfoBoard";
import { SandParticles } from "./elements/particles";
import { Plate } from "./elements/Plate";
import { Rock, Rock2 } from "./elements/rock";
import { useInteractionGround } from "./useInteractionGround";
import { Shrine } from "./elements/Shrine";
import { useCompoundBody } from "@react-three/cannon";

export function BeachMap() {
  const players = useRecoilValue(PlayersAtom);
  useInteractionGround();

  return (
    <group>
      {players.map((player) => (
        <Player key={player.id} player={player} />
      ))}

      <Elements />
    </group>
  );
}

const Elements = memo(function Elements() {
  return (
    <>
      <SandFloor />
      <SandParticles />
      <Sand />
      <Ocean />
      <BeachParasol />
      <BoomBox />

      <TransparentWalls />

      <Shrine />
      <ChicksFlyNaming />
      <ParkInfoBoard />

      <BeachChairs />

      <BeachBall />
      <Ladder />
      <PalmTree />

      <Plate />
      <Crab />
      <Log2 />
      <Log />
      <Rock />
      <Rock2 />

      <Boat />

      <Dock />

      <DesertPebble position={[0, -0.2, -3]} color="#d1ae7f" receiveShadow />
      <DesertPebble position={[0, 1, 9]} color="#d1ae7f" receiveShadow />
      <DesertPebble
        position={[-15, -0.7, 8]}
        color="#dbb990"
        scale={[1200, 28, 500]}
        rotation={[-0.009, 0, 3]}
      />
      <DesertPebble
        position={[1, -0.7, 8]}
        color="#dbb990"
        scale={[1200, 28, 500]}
        rotation={[-0.009, 2.5, 3]}
      />
      <DesertPebble
        position={[-15, -0.7, 9]}
        color="#dbb990"
        scale={[1200, 28, 500]}
        rotation={[-0.009, 0.02, 0]}
        receiveShadow
      />
    </>
  );
});

const TransparentWalls = () => {
  useCompoundBody(() => ({
    type: "Static",

    shapes: [
      { type: "Box", args: [40, 10, 0.25], position: [0, 3, 10] },
      { type: "Box", args: [0.25, 10, 50], position: [20, 3, -15] },
      { type: "Box", args: [40, 10, 0.25], position: [0, 3, -40] },
      { type: "Box", args: [0.25, 10, 50], position: [-20, 3, -15] },
    ],
  }));
  return null;
};
