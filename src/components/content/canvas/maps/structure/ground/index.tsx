import { PlayersAtom } from "@/store/PlayersAtom";
import { useStableArray } from "@/utils";
import { useRecoilValue } from "recoil";
import FakePlayer from "../../player/FakePlayer";
import Player from "../../player/Player";
import { BrickTransparentWall } from "../room/BrickTransparentWall";
import { CardboardBoxes } from "../room/CardboardBoxes";
import { CinderBlock } from "../room/CinderBlock";
import { DingusTheCat } from "../room/DingusTheCat";
import { DirtFloorTile } from "../room/DirtFloorTile";
import { Mailbox } from "../room/Mailbox";
import { ChicksFlyNaming } from "../text";
import Bridge from "./elements/Bridge";
import {
  Floor2nd,
  FloorGround,
  FloorStoneWalkway,
  FloorWhiteStone,
} from "./elements/floor";
import { CircleInteractionPortal } from "./elements/interactionPortal";
import { PostLantern } from "./elements/lantern";
import { Lilypad } from "./elements/Lilypad";
import { Parasol } from "./elements/Parasol";
import { ParkInfoBoard } from "./elements/ParkInfoBoard";
import { PicnicTable } from "./elements/PicnicTable";
import { Ponds } from "./elements/Ponds";
import { Rock } from "./elements/Rock";
import Stair from "./elements/Stair";
import { StreetLight } from "./elements/StreetLight";
import { BrickWall, ShojiWall, TransparentWalls } from "./elements/wall";

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
      {/* <LampSquareTable /> */}

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
      <PicnicTable />
      <Parasol />
      <StreetLight />
      <DirtFloorTile />
      {/* <ModernRoom /> */}

      <BrickWall
        args={useStableArray([0.5, 3.45, 7.5])}
        position={useStableArray([-7.8, 2.63, -39])}
        side={useStableArray([1])}
        color="#dfdfdf"
      />
      <BrickWall
        args={useStableArray([0.5, 3.45, 6.5])}
        position={useStableArray([-7.8, 2.63, -32])}
        side={useStableArray([1])}
        color="#dfdfdf"
      />
      <BrickWall
        args={useStableArray([6.1, 3.26, 0.5])}
        position={useStableArray([-5.15, 2.63, -28.9])}
        side={useStableArray([0])}
        color="#dfdfdf"
      />
      <BrickWall
        args={useStableArray([4.1, 3.26, 0.5])}
        position={useStableArray([4, 2.63, -28.9])}
        side={useStableArray([0, 1])}
        color="#dfdfdf"
      />
      <BrickWall
        args={useStableArray([0.5, 3.5, 2])}
        position={useStableArray([5.7, 2.63, -29.8])}
        side={useStableArray([1])}
        color="#dfdfdf"
      />
      <BrickWall
        args={useStableArray([5, 4.5, 0.5])}
        position={useStableArray([8, 3.25, -31])}
        side={useStableArray([0])}
        color="#dfdfdf"
      />
      <BrickWall
        args={useStableArray([5, 4.5, 0.5])}
        position={useStableArray([13, 3.25, -31])}
        side={useStableArray([0])}
        color="#dfdfdf"
      />
      <BrickWall
        args={useStableArray([5.7, 4.5, 0.5])}
        position={useStableArray([18.35, 3.25, -31])}
        side={useStableArray([0, 1])}
        color="#dfdfdf"
      />
      <BrickWall
        args={useStableArray([0.5, 4.6, 6.1])}
        position={useStableArray([21.15, 3.3, -34])}
        side={useStableArray([0, 1])}
        color="#dfdfdf"
      />
      <BrickWall
        args={useStableArray([0.5, 4.6, 7.5])}
        position={useStableArray([21.17, 3.3, -40.7])}
        side={useStableArray([1])}
        color="#dfdfdf"
      />
      <BrickWall
        args={useStableArray([7.9, 4.5, 0.5])}
        position={useStableArray([17.23, 3.25, -44.5])}
        side={useStableArray([0])}
        color="#dfdfdf"
      />
      <BrickTransparentWall />

      <CinderBlock
        position={useStableArray([5.5, 4.95, -30.2])}
        rotation={useStableArray([0, Math.PI / 2, -Math.PI / 1.3])}
      />
      <CinderBlock
        position={useStableArray([7, 1.3, -30.2])}
        rotation={useStableArray([Math.PI / 2, 0, 0])}
      />
      <CinderBlock
        position={useStableArray([7.5, 1.2, -30.2])}
        rotation={useStableArray([-0.3, 0, -Math.PI / 8])}
      />

      {/*
      
     
      
      
     
      <WallTexture
        map={"brick"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([7.9, 4.5, 0.5])}
        position={useStableArray([17.23, 3.25, -44.5])}
        color="#ffffff"
        castShadow={true}
        repeat={1}
      /> */}
      {/* <WallTexture
        map={"brick"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([5, 3.2, 0.5])}
        position={useStableArray([-10, 2.7, -36.2])}
        color="#ffffff"
        castShadow={true}
        repeat={2}
      /> */}
      {/* <BrickWall
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
      <BrickTransparentWall /> */}

      <Mailbox />
      <CardboardBoxes />
      {/* <Bicycle /> */}
      <DingusTheCat />
    </group>
  );
}
