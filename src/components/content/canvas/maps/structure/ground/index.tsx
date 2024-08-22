import Loader from "@/components/content/html/Loader";
import { IsInsideShowHouseAtom } from "@/store/InteractionAtom";
import { PlayersAtom } from "@/store/PlayersAtom";
import { useStableArray } from "@/utils";
import { Suspense } from "react";
import { useRecoilValue } from "recoil";
import FakePlayer from "../../player/FakePlayer";
import Player from "../../player/Player";
import { BrickTransparentWall } from "../room/BrickTransparentWall";
import { CardboardBoxes } from "../room/CardboardBoxes";
import { CinderBlock } from "../room/CinderBlock";
import { DingusTheCat } from "../room/DingusTheCat";
import { DirtFloorTile } from "../room/DirtFloorTile";
import { Mailbox } from "../room/Mailbox";
import ModernRoom from "../room/ModernRoom";
import { ChicksFlyNaming } from "../text";
import Bridge from "./elements/Bridge";
import {
  Floor2nd,
  FloorGround,
  FloorStoneWalkway,
  FloorWhiteStone,
} from "./elements/floor";
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
import { useInteractionGround } from "./useInteractionGround";

export default function GroundElements() {
  const players = useRecoilValue(PlayersAtom);
  const isInsideShowHouse = useRecoilValue(IsInsideShowHouseAtom);
  useInteractionGround();
  return (
    <group>
      {players.map((player) => (
        <Player key={player.id} player={player} />
      ))}
      <TransparentWalls />

      <ChicksFlyNaming />

      {/* Toutorial */}
      <FakePlayer />
      <PostLantern />
      <ParkInfoBoard />

      {/* 1st Floor */}
      <FloorStoneWalkway count={7} height={10.5} y={0} z={0} z2={-8} />
      <ShojiWall />
      <FloorGround />

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
      <Mailbox />
      <CardboardBoxes />
      <DingusTheCat />
      <StreetLight />
      <DirtFloorTile />

      <BrickWall
        args={useStableArray([0.5, 3.45, 8.5])}
        position={useStableArray([-7.8, 2.63, -39.5])}
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
        args={useStableArray([6.5, 4.5, 0.5])}
        position={useStableArray([18.05, 3.25, -44.3])}
        side={useStableArray([0])}
        color="#dfdfdf"
      />
      <BrickWall
        args={useStableArray([8, 4.5, 0.5])}
        position={useStableArray([10.8, 3.25, -44.3])}
        side={useStableArray([0])}
        color="#dfdfdf"
      />
      <BrickWall
        args={useStableArray([7.9, 4.5, 0.5])}
        position={useStableArray([2.85, 3.25, -44.3])}
        side={useStableArray([0])}
        color="#dfdfdf"
      />
      <BrickWall
        args={useStableArray([6.8, 4.2, 0.5])}
        position={useStableArray([-4.5, 2.1, -44.1])}
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

      {isInsideShowHouse && (
        <Suspense fallback={<Loader />}>
          <ModernRoom />
        </Suspense>
      )}
    </group>
  );
}
