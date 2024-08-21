import {
  IsInsideFoyerAtom,
  IsInsideHouseAtom,
  IsInsideRooftopAtom,
} from "@/store/InteractionAtom";
import { useStableArray } from "@/utils";
import { useRecoilValue } from "recoil";
import { WallTexture } from "../../ground/elements/wall";
import { WallShelf } from "../WallShelf";
import { Bed } from "./Bed";
import { Chair } from "./Chair";
import { Desk } from "./Desk";
import { Railing } from "./Railing";
import { RugSquare } from "./RugSquare";
import Stair from "./Stair";
import { Cube } from "./Cube";
import { Laptop } from "./Laptop";

export default function Attic() {
  const isInsideFoyer = useRecoilValue(IsInsideFoyerAtom);
  const isInnerHouse = useRecoilValue(IsInsideHouseAtom);
  const isInsideRooftop = useRecoilValue(IsInsideRooftopAtom);
  return (
    <>
      {/* 바닥 */}
      <WallTexture
        map={"marble3"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([10.1, 0.25, 9.9])}
        position={useStableArray([0, 7.4, -37.9])}
        color="#e4e4e4"
        castShadow={false}
        repeat={10}
        isHidden={isInsideFoyer}
      />
      {!isInsideFoyer && !isInsideRooftop && (
        <>
          <Chair />
          <Desk />
          <WallShelf />
          <Railing />
          <Bed />
          <Cube />
          <Laptop />
          <RugSquare />
        </>
      )}

      {isInnerHouse && <Stair />}
    </>
  );
}
