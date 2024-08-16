import { useStableArray } from "@/utils";
import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { PointLightHelper } from "three";
import { Wall, WallTexture, WallWithHole } from "../ground/elements/wall";
import Elevator from "./Elevator";
import FrontDoor from "./FrontDoor";
import Rooftop from "./Rooftop";
import { useWallVisible } from "./useWallVisible";
import Attic from "./Attic";

export default function ModernRoom() {
  const lightRef = useRef<any>(null);
  const { isInnerHouse } = useWallVisible();

  useHelper(lightRef, PointLightHelper, 1, "red");

  return (
    <group>
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
        map={"VintageWood"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([1, 2.9, 1])}
        position={useStableArray([16.85, 2.3, -33.55])}
        color="#e4e4e4"
        castShadow={true}
      />
      <WallTexture
        map={"VintageWood"}
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
        map={"VintageWood"}
        rotation={useStableArray([-Math.PI / 2, 0, 0])}
        args={useStableArray([10, 0.2, 2])}
        position={useStableArray([0, 3.5, -42.55])}
        color="#e4e4e4"
        castShadow={false}
      />

      {/* left */}
      <WallWithHole
        rotation={useStableArray([0, -Math.PI / 2, 0])}
        position={useStableArray([-4.9, 4.5, -37.91])}
        color={"#e4e4e4"}
      />
      <WallTexture
        map={"VintageWood"}
        rotation={useStableArray([-Math.PI / 2, 0, 0])}
        args={useStableArray([0.2, 10, 2])}
        color="#d2d2d2"
        position={useStableArray([-4.8, 3.5, -37.91])}
      />
      {/* 바닥 */}
      <WallTexture
        map={"VintageWood"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([10.2, 0.5, 10])}
        position={useStableArray([0, 2.5, -37.9])}
        color="#e4e4e4"
        castShadow={true}
      />

      <Attic />

      {/* 2층 계단*/}
      <WallTexture
        map={"VintageWood"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([10, 1, 0.25])}
        position={useStableArray([5.57, 2.85, -37.9])}
        color="#e4e4e4"
        castShadow={true}
      />
      <WallTexture
        map={"VintageWood"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([10, 1, 0.25])}
        position={useStableArray([6.07, 3.1, -37.9])}
        color="#e4e4e4"
        castShadow={true}
      />
      <WallTexture
        map={"VintageWood"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([10, 1, 0.25])}
        position={useStableArray([6.57, 3.35, -37.9])}
        color="#e4e4e4"
        castShadow={true}
      />
      <WallTexture
        map={"VintageWood"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([10, 1, 0.25])}
        position={useStableArray([7.07, 3.6, -37.9])}
        color="#e4e4e4"
        castShadow={true}
      />
      <WallTexture
        map={"VintageWood"}
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
        map={"VintageWood"}
        rotation={useStableArray([-Math.PI / 2, Math.PI / 1.2, 0])}
        args={useStableArray([4.7, 0.2, 2])}
        position={useStableArray([5.945, 3.93, -42.56])}
        color="#e4e4e4"
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
        map={"VintageWood"}
        rotation={useStableArray([-Math.PI / 2, 0, 0])}
        args={useStableArray([10, 0.2, 1.69])}
        position={useStableArray([12.499, 5.13, -42.55])}
        color="#e4e4e4"
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
        map={"VintageWood"}
        rotation={useStableArray([-Math.PI / 2, 0, -Math.PI / 2])}
        args={useStableArray([10, 10, 0.45])}
        position={useStableArray([12.5, 4, -37.9])}
        color="#e4e4e4"
        castShadow={true}
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

      <Elevator />

      <Rooftop />
      {/* 선반 */}
      {/* <Wall
        args={[0.5, 0.1, 4.5]}
        position={[-4.7, 3, 0]}
        color="rgb(137,136,134)"
      /> */}

      {/* <Charizard /> */}
      {/* <Books /> */}
      {/* <BookShelf />

      <RubberDuck /> */}

      {/* <Curtain /> */}
      {/* <Curtain2 />
      <WindowLarge /> */}
      {/* <WindowBlinds /> */}
      {/* <FloorVintage />

      <CouchWide /> */}
    </group>
  );
}
