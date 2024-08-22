import { PlayersAtom } from "@/store/PlayersAtom";
import { useStableArray } from "@/utils";
import { useRecoilValue } from "recoil";
import FakePlayer from "../../player/FakePlayer";
import Player from "../../player/Player";
import { Bicycle } from "../room/Bicycle";
import { BrickTransparentWall } from "../room/BrickTransparentWall";
import { CinderBlock } from "../room/CinderBlock";
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
import { BrickWall, ShojiWall, TransparentWalls } from "./elements/wall";

export default function GroundElements() {
  const players = useRecoilValue(PlayersAtom);
  console.log("hi");
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
      {/* <PicnicTable />
      <Parasol />
      <StreetLight /> */}
      <DirtFloorTile />
      {/* <ModernRoom /> */}

      <BrickWall
        position={useStableArray([8.7, 0.4, -28.8])}
        scale={useStableArray([0.027, 0.03, 0.015])}
        rotation={useStableArray([-Math.PI / 2, 0, 0])}
        receiveShadow
      />
      <BrickWall
        position={useStableArray([13, 0.4, -28.8])}
        scale={useStableArray([0.0175, 0.03, 0.015])}
        rotation={useStableArray([-Math.PI / 2, 0, 0])}
      />
      <BrickWall
        position={useStableArray([26, 0.4, -30.8])}
        scale={useStableArray([0.033, 0.03, 0.02])}
        rotation={useStableArray([-Math.PI / 2, 0, 0])}
      />
      <BrickWall
        position={useStableArray([35.95, 0.4, -30.8])}
        scale={useStableArray([0.037, 0.03, 0.02])}
        rotation={useStableArray([-Math.PI / 2, 0, 0])}
      />
      <BrickWall
        position={useStableArray([36, 0.4, -44.5])}
        scale={useStableArray([0.037, 0.03, 0.02])}
        rotation={useStableArray([-Math.PI / 2, 0, 0])}
      />
      <BrickWall
        position={useStableArray([21, 0.5, -5.95])}
        scale={useStableArray([0.062, 0.03, 0.02])}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        receiveShadow
      />
      <BrickWall
        position={useStableArray([-8, 0.5, -2.8])}
        scale={useStableArray([0.065, 0.03, 0.015])}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
      />
      <BrickWall
        position={useStableArray([5.5, 0.5, -24.8])}
        scale={useStableArray([0.01, 0.03, 0.015])}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
      />
      <BrickTransparentWall />
      <CinderBlock
        position={useStableArray([4.8, 4.2, -29.2])}
        rotation={useStableArray([0, Math.PI / 2, -Math.PI / 1.3])}
      />
      <CinderBlock
        position={useStableArray([7.8, 2.1, -30.2])}
        rotation={useStableArray([Math.PI / 2, 0, 0])}
      />
      <CinderBlock
        position={useStableArray([8.5, 1.8, -30.2])}
        rotation={useStableArray([Math.PI / 2, -Math.PI / 8, 0])}
      />
      {/* <Mailbox /> */}
      {/* <CardboardBoxes /> */}
      <Bicycle />
      {/* <DingusTheCat /> */}
    </group>
  );
}
