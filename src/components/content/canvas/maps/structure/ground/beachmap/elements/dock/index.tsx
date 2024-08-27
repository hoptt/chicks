import Loader from "@/components/content/html/Loader";
import { IsInsideHouseAtom } from "@/store/InteractionAtom";
import { memo, Suspense } from "react";
import { useRecoilValue } from "recoil";
import Elevator from "../Elevator";
import FrontDoor from "../FrontDoor";
import Rooftop from "../rooftop";
import { MarbleWall, Wall, WallWithHole, WoodRooftop, WoodWall } from "../wall";
import { DockBridge } from "./DockBridge";
import { DockFloor } from "./DockFloor";
import { DockHouse } from "./DockHouse";
import { DockStairs } from "./DockStairs";
import { Pallet } from "./Pallet";
import TransparentWalls from "./TransparentWalls";

export default function Dock() {
  const isInsideHouse = useRecoilValue(IsInsideHouseAtom);

  return (
    <group>
      {isInsideHouse && (
        <Suspense fallback={<Loader />}>
          <DockHouse />
        </Suspense>
      )}

      {!isInsideHouse && (
        <>
          <WoodWall />
          <WoodRooftop />
          <Rooftop />
          <Elevator />
        </>
      )}
      <DockHouseOuter />
      <DockStandard />
    </group>
  );
}

const DockHouseOuter = memo(function DockHouseOuter() {
  return (
    <>
      {/* 바닥 */}
      <MarbleWall
        args={[9.99, 0.25, 9.99]}
        position={[9, 1.55, -23.5]}
        side={[5]}
        repeat={3}
        color="#dfdfdf"
      />
      {/* 벽 - 뒤 */}
      <Wall
        args={[10, 6, 0.2]}
        position={[9, 4.5, -28.5]}
        color={"#dedede"}
        castShadow={false}
      />
      {/* 벽 - 왼쪽 */}
      <WallWithHole />

      <FrontDoor />
    </>
  );
});

const DockStandard = memo(function DockStandard() {
  return (
    <>
      <TransparentWalls />
      <Pallet />
      <DockStairs />
      <DockBridge />
      <DockFloor />
    </>
  );
});
