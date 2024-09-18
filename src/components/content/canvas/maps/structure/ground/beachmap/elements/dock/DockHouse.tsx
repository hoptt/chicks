import { memo } from "react";
import { AirConditioner } from "../house/AirConditioner";
import { BlankPictureFrame } from "../house/BlankPictureFrame";
import { Cabinet } from "../house/Cabinet";
import { CircleTable } from "../house/CircleTable";
import { CoffeeTable } from "../house/CoffeeTable";
import { Curtain } from "../house/Curtain";
import { DvD } from "../house/DvD";
import { Globe } from "../house/Globe";
import { LCouch } from "../house/LCouch";
import { PictureFrame } from "../house/PictureFrame";
import { Plant } from "../house/Plant";
import { RubberDuck } from "../house/RubberDuck";
import { RugRound } from "../house/RugRound";
import { ShelfSmall } from "../house/ShelfSmall";
import TransparentWalls from "../house/TransparentWalls";
import { TV } from "../house/TV";
import { WallDesign } from "../house/WallDesign";
import { WallDeskSpeaker } from "../house/WallDeskSpeaker";
import { WindowBlinds } from "../house/WindowBlinds";
import { Cake } from "../party/Cake";
import { Candle } from "../party/Candle";
import { Cone } from "../party/Cone";

export const DockHouse = memo(function DockHouse() {
  return (
    <group>
      <TransparentWalls />

      <Curtain />
      <WindowBlinds />

      <WallDesign />
      <Cabinet />
      <ShelfSmall />
      <WallDeskSpeaker />
      <TV />
      <DvD />
      <Globe />
      <RubberDuck />

      <LCouch />
      <RugRound />
      <CircleTable />

      {/* <RemoteControl /> */}
      <Cake />
      <Candle />
      <Cone />
      <AirConditioner />
      <PictureFrame />
      <CoffeeTable />
      <BlankPictureFrame />
      <Plant />
    </group>
  );
});
