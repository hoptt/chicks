import { PlayersAtom } from "@/store/PlayersAtom";
import { Fragment } from "react/jsx-runtime";
import { useRecoilValue } from "recoil";
import FakePlayer from "../../player/FakePlayer";
import Player from "../../player/Player";
import HowToPlay from "../tutorial/HowToPlay";
import { BatsignalThingy } from "./elements/BatsignalThingy";
import Bridge from "./elements/Bridge";
import {
  Floor2nd,
  FloorGround,
  FloorStoneWalkway,
  FloorWhiteStone,
} from "./elements/floor";
import { LampSquareTable, PostLantern } from "./elements/lantern";
import { Lilypad } from "./elements/Lilypad";
import { ParkInfoBoard } from "./elements/ParkInfoBoard";
import { Ponds } from "./elements/Ponds";
import { Rock } from "./elements/Rock";
import { RubberDuck } from "./elements/RubberDuck";
import Stair from "./elements/Stair";
import { ShojiWall, TransparentWalls } from "./elements/wall";

export default function GroundElements() {
  const players = useRecoilValue(PlayersAtom);
  return (
    <>
      {players.map((player) => (
        <Fragment key={player.id}>
          <Player player={player} />
        </Fragment>
      ))}

      <TransparentWalls />

      {/* Toutorial */}
      <HowToPlay />
      <FakePlayer />
      <PostLantern />
      <ParkInfoBoard />

      {/* 1st Floor */}
      <FloorStoneWalkway count={7} height={10.5} y={0} z={0} z2={-8} />
      <ShojiWall />
      <FloorGround />

      {/* SideLantern */}
      <BatsignalThingy />
      <LampSquareTable />

      {/* Bridge */}
      <Stair />
      <FloorWhiteStone />
      <FloorStoneWalkway count={2} height={3.5} y={1.01} z={-12.4} z2={-13.2} />
      <Ponds />
      <Rock />
      <RubberDuck />
      <Lilypad />
      <Bridge />

      {/* 2nd Floor*/}
      <Floor2nd />
      <FloorStoneWalkway count={7} height={10.5} y={1.01} z={-20.8} z2={-25} />
    </>
  );
}
