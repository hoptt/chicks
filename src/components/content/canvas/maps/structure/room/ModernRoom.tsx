import { useStableArray } from "@/utils";
import { Curtain } from "../ground/elements/Curtain";
import {
  BrickWall,
  Wall,
  WallTexture,
  WallWithHole,
} from "../ground/elements/wall";
import { WindowBlinds } from "../ground/elements/WindowBlinds";
import { WindowLarge } from "../ground/elements/WindowLarge";
import Attic from "./attic/Attic";
import { Bicycle } from "./Bicycle";
import { BrickTransparentWall } from "./BrickTransparentWall";
import { Cabinet } from "./Cabinet";
import { CardboardBoxes } from "./CardboardBoxes";
import { CinderBlock } from "./CinderBlock";
import { DingusTheCat } from "./DingusTheCat";
import { DvD } from "./DvD";
import Elevator from "./Elevator";
import FrontDoor from "./FrontDoor";
import { Globe } from "./Globe";
import { LCouch } from "./LCouch";
import { Mailbox } from "./Mailbox";
import Rooftop from "./Rooftop";
import { RugRound } from "./RugRound";
import { ShelfSmall } from "./ShelfSmall";
import { TV } from "./TV";
import { useWallVisible } from "./useFieldInteraction";
import { WallDeskSpeaker } from "./WallDeskSpeaker";
import { RubberDuck } from "../ground/elements/RubberDuck";
import { CircleTable } from "./CircleTable";
import { RemoteControl } from "./RemoteControl";
import { AirConditioner } from "./AirConditioner";
import { PictureFrame } from "./PictureFrame";
import { CoffeeTable } from "./CoffeeTable";
import { BlankPictureFrame } from "./BlankPictureFrame";
import { Plant } from "./Plant";

export default function ModernRoom() {
  const { isInnerHouse } = useWallVisible();
  return (
    <group>
      <rectAreaLight
        args={["white", 15, 1, 5]}
        position-z={-38}
        rotation-x={-Math.PI / 2}
        rotation-z={-Math.PI / 2}
        position-x={13}
        position-y={10.5}
      />
      {/* 돌담 */}
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
      <Mailbox />
      <CardboardBoxes />
      <Bicycle />
      <DingusTheCat />
      {/* 받침 */}
      <WallTexture
        map={"marble"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([1, 1.5, 5])}
        position={useStableArray([-4.5, 1.5, -33.4])}
        color="#b5b5b5"
        castShadow={true}
      />
      <WallTexture
        map={"marble"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([1, 1.5, 5])}
        position={useStableArray([4.5, 1.5, -33.4])}
        color="#b7b7b7"
        castShadow={true}
      />

      <WallTexture
        map={"marble3"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([1, 2.9, 1])}
        position={useStableArray([16.85, 2.3, -33.55])}
        color="#e4e4e4"
        castShadow={true}
      />
      <WallTexture
        map={"marble3"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([1, 2.9, 1])}
        position={useStableArray([16.85, 2.3, -42.35])}
        color="#e4e4e4"
        castShadow={true}
      />
      {/* 정면 문 */}
      <FrontDoor />

      {/* right */}
      <Wall
        rotation={useStableArray([-Math.PI / 2, 0, 0])}
        args={useStableArray([10.07, 0.2, 7])}
        position={useStableArray([-0.065, 6, -42.8])}
        color={"#dedede"}
        castShadow={false}
      />
      <WallTexture
        map={"marble"}
        rotation={useStableArray([-Math.PI / 2, 0, 0])}
        args={useStableArray([10, 0.2, 2])}
        position={useStableArray([0, 3.5, -42.55])}
        color="#ededed"
        repeat={1}
        castShadow={false}
      />

      {/* left */}
      <WallWithHole
        rotation={useStableArray([0, -Math.PI / 2, 0])}
        position={useStableArray([-4.9, 4.5, -37.91])}
        color={"#e4e4e4"}
      />
      <WallTexture
        map={"marble"}
        rotation={useStableArray([-Math.PI / 2, 0, 0])}
        args={useStableArray([0.2, 10, 2])}
        color="#ebebeb"
        position={useStableArray([-4.8, 3.51, -37.91])}
        repeat={1}
      />
      {/* 바닥 */}
      <WallTexture
        map={"marble"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([10.2, 0.5, 10])}
        position={useStableArray([0, 2.5, -37.9])}
        color="#ffffff"
        castShadow={true}
        repeat={1}
      />

      {/* 2층 계단*/}
      <WallTexture
        map={"marble3"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([10, 1, 0.25])}
        position={useStableArray([5.57, 2.85, -37.9])}
        color="#e4e4e4"
        castShadow={true}
      />
      <WallTexture
        map={"marble3"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([10, 1, 0.25])}
        position={useStableArray([6.07, 3.1, -37.9])}
        color="#e4e4e4"
        castShadow={true}
      />
      <WallTexture
        map={"marble3"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([10, 1, 0.25])}
        position={useStableArray([6.57, 3.35, -37.9])}
        color="#e4e4e4"
        castShadow={true}
      />
      <WallTexture
        map={"marble3"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([10, 1, 0.25])}
        position={useStableArray([7.07, 3.6, -37.9])}
        color="#e4e4e4"
        castShadow={true}
      />
      <WallTexture
        map={"marble3"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([10, 1, 0.25])}
        position={useStableArray([7.57, 3.85, -37.9])}
        color="#e4e4e4"
        castShadow={true}
      />
      {/* 계단 외벽 가리개 */}
      <WallTexture
        map={"marble"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([1.5, 1, 0.25])}
        position={useStableArray([5.5, 3.45, -33.05])}
        color="#e4e4e4"
        castShadow={false}
        isHidden={isInnerHouse}
      />
      <WallTexture
        map={"marble"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([1.2, 0.5, 0.25])}
        position={useStableArray([6.8, 3.7, -33.06])}
        color="#e4e4e4"
        castShadow={false}
        isHidden={isInnerHouse}
      />
      <WallTexture
        map={"marble"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([2.5, 0.5, 0.25])}
        position={useStableArray([6.3, 4.1, -33.07])}
        color="#e4e4e4"
        castShadow={false}
        isHidden={isInnerHouse}
      />

      {/* 2층 올라가는길 벽 */}
      <WallTexture
        map={"marble"}
        rotation={useStableArray([-Math.PI / 2, Math.PI / 1.2, 0])}
        args={useStableArray([4.7, 0.2, 2])}
        position={useStableArray([5.945, 3.93, -42.56])}
        color="#e4e4e4"
        repeat={1}
        castShadow={false}
      />
      <Wall
        rotation={useStableArray([-Math.PI / 2, Math.PI / 1.2, 0])}
        args={useStableArray([5.5, 0.2, 6.03])}
        position={useStableArray([5.8, 6.475, -42.8])}
        color={"#dedede"}
        castShadow={false}
      />
      {/* 2층 오른쪽 벽 */}
      <WallTexture
        map={"marble3"}
        rotation={useStableArray([-Math.PI / 2, 0, 0])}
        args={useStableArray([10, 0.2, 1.69])}
        position={useStableArray([12.499, 5.13, -42.55])}
        color="#e4e4e4"
        repeat={1}
        castShadow={false}
      />
      <Wall
        rotation={useStableArray([-Math.PI / 2, 0, 0])}
        args={useStableArray([10.8, 0.2, 6.25])}
        position={useStableArray([12.1, 7.35, -42.8])}
        color={"#dedede"}
        castShadow={false}
      />
      {/* 2층 바닥 */}
      <WallTexture
        map={"marble2"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([10, 10, 0.45])}
        position={useStableArray([12.5, 4, -37.8])}
        color="#e4e4e4"
        castShadow={true}
        repeat={10}
      />

      {/* 가벽 1 */}

      <WallTexture
        map={"marble"}
        rotation={useStableArray([-Math.PI / 2, 0, 0])}
        args={useStableArray([10, 0.2, 6.25])}
        position={useStableArray([12.5, 7.35, -32.9])}
        color={"#dedede"}
        castShadow={false}
        repeat={1}
        isHidden={isInnerHouse}
      />
      <WallTexture
        map={"marble2"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([2.4, 5.25, 0.25])}
        position={useStableArray([6.3, 7, -33.06])}
        color="#e4e4e4"
        castShadow={true}
        isHidden={isInnerHouse}
      />

      <Attic />

      <Elevator />

      <Rooftop />
      {/* 선반 */}
      <Wall
        args={useStableArray([0.5, 0.1, 4.5])}
        rotation={useStableArray([0, 0, 0])}
        position={useStableArray([-4.8, 5.5, -38])}
        color="rgb(137,136,134)"
      />

      {/* <Books /> */}
      {/* <BookShelf />

       */}

      {isInnerHouse && (
        <>
          <Curtain />

          <WindowLarge />
          <WindowBlinds />

          <Cabinet />
          <ShelfSmall />
          <WallDeskSpeaker />
          <TV />
          <DvD />
          <RugRound />
          <LCouch />
          <Globe />
          <RubberDuck />
          <CircleTable />

          <RemoteControl />
          <AirConditioner />
          <PictureFrame />
          <CoffeeTable />
          <BlankPictureFrame />
          <Plant />
        </>
      )}
    </group>
  );
}
