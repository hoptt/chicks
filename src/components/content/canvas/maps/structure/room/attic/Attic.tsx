import { IsInsideFoyerAtom, IsInsideHouseAtom } from "@/store/InteractionAtom";
import { useStableArray } from "@/utils";
import { useRecoilValue } from "recoil";
import { WallTexture } from "../../ground/elements/wall";
import { Railing } from "./Railing";
import Stair from "./Stair";

export default function Attic() {
  const isInsideFoyer = useRecoilValue(IsInsideFoyerAtom);
  const isInnerHouse = useRecoilValue(IsInsideHouseAtom);
  return (
    <>
      {/* 바닥 */}
      <WallTexture
        map={"VintageWood"}
        rotation={useStableArray([0, 0, 0])}
        args={useStableArray([10.1, 0.25, 9.9])}
        position={useStableArray([0, 7.4, -37.9])}
        color="#e4e4e4"
        castShadow={false}
        isHidden={isInsideFoyer}
      />
      {!isInsideFoyer && <Railing />}

      {/* 다락방 계단 */}
      {isInnerHouse && <Stair />}
    </>
  );
}
