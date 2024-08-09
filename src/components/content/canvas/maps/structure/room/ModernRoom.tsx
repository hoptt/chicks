import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { PointLightHelper } from "three";
import { Wall, WallTexture, WallWithHole } from "../ground/elements/wall";
import FrontDoor from "./FrontDoor";
import { useWallVisible } from "./useWallVisible";

export default function ModernRoom() {
  const lightRef = useRef<any>(null);
  const { isInnerHouse } = useWallVisible();

  useHelper(lightRef, PointLightHelper, 1, "red");

  return (
    <group>
      {/* 받침 */}
      <WallTexture
        map={"VintageWood"}
        rotation={[-Math.PI / 2, 0, 0]}
        args={[1, 1, 2]}
        position={[-4.5, 1.5, -33.4]}
        color="#e4e4e4"
        castShadow={true}
      />
      <WallTexture
        map={"VintageWood"}
        rotation={[-Math.PI / 2, 0, 0]}
        args={[1, 1, 2]}
        position={[4.5, 1.5, -33.4]}
        color="#e4e4e4"
        castShadow={true}
      />
      {/* 정면 문 */}
      <FrontDoor />

      {/* right */}
      <Wall
        rotation={[-Math.PI / 2, 0, 0]}
        args={[10.07, 0.2, 7]}
        position={[-0.065, 6, -43]}
        color={"#72b3b3"}
        castShadow={false}
      />
      <WallTexture
        map={"VintageWood"}
        rotation={[-Math.PI / 2, 0, 0]}
        args={[10, 0.2, 2]}
        position={[0, 3.5, -42.8]}
        color="#e4e4e4"
        castShadow={false}
      />

      {/* left */}
      <WallWithHole
        rotation={[0, -Math.PI / 2, 0]}
        position={[-4.9, 4.5, -38]}
        color={"#5aa0a0"}
      />
      <WallTexture
        map={"VintageWood"}
        rotation={[-Math.PI / 2, 0, 0]}
        args={[0.2, 10, 2]}
        color="#d2d2d2"
        position={[-4.8, 3.5, -38]}
      />
      {/* 바닥 */}
      <WallTexture
        map={"VintageWood"}
        rotation={[0, 0, 0]}
        args={[10.2, 0.5, 10]}
        position={[0, 2.5, -37.9]}
        color="#e4e4e4"
        castShadow={true}
      />

      {/* 2층 계단*/}
      <WallTexture
        map={"VintageWood"}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        args={[10, 2, 0.7]}
        position={[6, 3, -37.9]}
        color="#e4e4e4"
        castShadow={false}
      />
      <WallTexture
        map={"VintageWood"}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        args={[10, 2, 0.7]}
        position={[7, 3.5, -37.9]}
        color="#e4e4e4"
        castShadow={false}
      />

      {/* 2층 올라가는길 벽 */}
      <WallTexture
        map={"VintageWood"}
        rotation={[-Math.PI / 2, Math.PI / 1.2, 0]}
        args={[3, 0.2, 2]}
        position={[6, 3.9, -42.8]}
        color="#e4e4e4"
        castShadow={false}
      />
      <Wall
        rotation={[-Math.PI / 2, Math.PI / 1.2, 0]}
        args={[5, 0.2, 6]}
        position={[6, 6.7, -43]}
        color={"#72b3b3"}
        castShadow={false}
      />
      {/* 2층 오른쪽 벽 */}
      <Wall
        rotation={[-Math.PI / 2, 0, 0]}
        args={[10.8, 0.2, 7]}
        position={[12.05, 7.05, -43]}
        color={"#72b3b3"}
        castShadow={false}
      />
      {/* 2층 바닥 */}
      <WallTexture
        map={"VintageWood"}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        args={[10, 10, 0.7]}
        position={[12.5, 4, -37.9]}
        color="#e4e4e4"
        castShadow={true}
      />

      {/* 가벽 1 */}
      <Wall
        rotation={[-Math.PI / 2, 0, 0]}
        args={[12.6, 0.2, 7]}
        position={[11.2, 6.1, -32.5]}
        color={"#72b3b3"}
        castShadow={false}
        isHidden={isInnerHouse}
      />
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
