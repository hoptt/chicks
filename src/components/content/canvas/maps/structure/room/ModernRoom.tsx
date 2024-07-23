import { Books } from "../ground/elements/Books";
import { BookShelf } from "../ground/elements/BookShelf";
import { CouchWide } from "../ground/elements/CouchWide";
import { Curtain2 } from "../ground/elements/Curtain2";
import { FloorVintage } from "../ground/elements/floor";
import { RubberDuck } from "../ground/elements/RubberDuck";
import { Wall, WallTexture, WallWithHole } from "../ground/elements/wall";
import { WindowLarge } from "../ground/elements/WindowLarge";

export default function ModernRoom() {
  return (
    <group>
      {/* right */}
      {/* <Wall
        rotation={[-Math.PI / 2, 0, 0]}
        args={[10.07, 0.2, 7]}
        position={[-0.065, 3.5, -5]}
        color={"#72b3b3"}
        castShadow={false}
      />
      <WallTexture
        map={"VintageWood"}
        rotation={[-Math.PI / 2, 0, 0]}
        args={[10, 0.2, 2]}
        position={[0, 1, -4.8]}
        color="#e4e4e4"
        castShadow={false}
      /> */}

      {/* left */}
      {/* <WallWithHole
        rotation={[0, -Math.PI / 2, 0]}
        position={[-4.9, 2, 0]}
        color={"#5aa0a0"}
      />
      <WallTexture
        map={"VintageWood"}
        rotation={[-Math.PI / 2, 0, 0]}
        args={[0.2, 10, 2]}
        color="#d2d2d2"
        position={[-4.8, 1, 0]}
      /> */}
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
