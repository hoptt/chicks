import { PlayersAtom } from "@/store/PlayersAtom";
import { useRecoilValue } from "recoil";
import FakePlayer from "../../player/FakePlayer";
import Player from "../../player/Player";
import { DirtFloorTile } from "../room/DirtFloorTile";
import { ChicksFlyNaming } from "../text";
import Bridge from "./elements/Bridge";
import {
  Floor2nd,
  FloorGround,
  FloorStoneWalkway,
  FloorWhiteStone,
} from "./elements/floor";
import { CircleInteractionPortal } from "./elements/interactionPortal";
import { LampSquareTable, PostLantern } from "./elements/lantern";
import { Lilypad } from "./elements/Lilypad";
import { ParkInfoBoard } from "./elements/ParkInfoBoard";
import { Ponds } from "./elements/Ponds";
import { Rock } from "./elements/Rock";
import Stair from "./elements/Stair";
import { ShojiWall, TransparentWalls } from "./elements/wall";

export default function GroundElements() {
  const players = useRecoilValue(PlayersAtom);

  return (
    <group>
      {players.map((player) => (
        <Player key={player.id} player={player} />
      ))}
      <TransparentWalls />

      <CircleInteractionPortal name="lightPortal" position={[0, 0.2, -5]} />

      <ChicksFlyNaming />

      {/* Toutorial */}
      <FakePlayer />
      <PostLantern />
      <ParkInfoBoard />

      {/* 1st Floor */}
      <FloorStoneWalkway count={7} height={10.5} y={0} z={0} z2={-8} />
      <ShojiWall />
      <FloorGround />

      {/* SideLantern */}
      {/* <BatsignalThingy /> */}
      <LampSquareTable />

      {/* Bridge */}
      <Stair />
      <FloorWhiteStone />
      <FloorStoneWalkway count={2} height={3.5} y={1.01} z={-12.4} z2={-13.2} />
      <Ponds />
      <Rock />
      <Lilypad />
      <Bridge />

      {/* 2nd Floor*/}
      <Floor2nd />
      <FloorStoneWalkway count={7} height={10.5} y={1.01} z={-20.8} z2={-25} />

      <DirtFloorTile />
      {/* <ModernRoom /> */}
    </group>
  );
}
