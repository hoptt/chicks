import { InteractionCriclePortal } from "@/types";
import { atom, selector } from "recoil";

// 방명록 상호작용 포탈
export const IsInsideGuestbookAtom = atom({
  key: "IsInsideGuestbook",
  default: false,
});
// 집 보여주기 (로드 최적화)
export const IsInsideShowHouseAtom = atom({
  key: "IsInsideShowHouse",
  default: false,
});
// 집안 가벽 상호작용 포탈
export const IsInsideHouseAtom = atom({
  key: "IsInsideHouse",
  default: false,
});
// 루프탑 상호작용 포탈
export const IsInsideRooftopAtom = atom({
  key: "IsInsideRooftopAtom",
  default: false,
});
// 루프탑 의자
export const IsInsideRooftopRugAtom = atom({
  key: "IsInsideRooftopRugAtom",
  default: false,
});
// 소파
export const IsInsideCouchAtom = atom({
  key: "IsInsideCouchAtom",
  default: false,
});
// 현관문 앞 방 상호작용 포탈
export const IsInsideFoyerAtom = atom({
  key: "IsInsideFoyer",
  default: false,
});

// 집 문 상호작용 포탈
export const IsInsideHouseDoorAtom = atom({
  key: "IsInsideHouseDoor",
  default: false,
});
// 엘레베이터 문(실내) 상호작용 포탈
export const IsInsideElevatorIndoorDoorAtom = atom({
  key: "IsInsideElevatorIndoorDoor",
  default: false,
});
// 엘레베이터 문(옥상) 상호작용 포탈
export const IsInsideElevatorRooftopDoorAtom = atom({
  key: "IsInsideElevatorRooftopDoor",
  default: false,
});
// 엘레베이터 상호작용 포탈
export const IsInsideElevatorAtom = atom({
  key: "IsInsideElevator",
  default: false,
});

// 포탈 위치
export const InteractionCriclePortalBoundingBoxAtom = atom<
  InteractionCriclePortal[]
>({
  key: "InteractionCriclePortalBoundingBoxAtom",
  default: [],
});

export const InteractionCriclePortalBoundingBoxSelector = selector({
  key: "InteractionCriclePortalBoundingBoxSelector",
  get: ({ get }) => {
    const pb = get(InteractionCriclePortalBoundingBoxAtom);
    return pb.map((item) => {
      return {
        name: item.name,
        corners: item.isMatrixUpdated
          ? [
              {
                x: item.box.max.x,
                y: item.box.max.y,
                z: item.box.max.z,
              },
              {
                x: item.box.max.x,
                y: item.box.min.y,
                z: item.box.min.z,
              },
              {
                x: item.box.min.x,
                y: item.box.min.y,
                z: item.box.min.z,
              },
              {
                x: item.box.min.x,
                y: item.box.max.y,
                z: item.box.max.z,
              },
            ]
          : [
              {
                x: item.box.max.x + item.position[0],
                y: item.box.max.y + item.position[1],
                z: item.box.max.z + item.position[2],
              },
              {
                x: item.box.max.x + item.position[0],
                y: item.box.min.y + item.position[1],
                z: item.box.min.z + item.position[2],
              },
              {
                x: item.box.min.x + item.position[0],
                y: item.box.min.y + item.position[1],
                z: item.box.min.z + item.position[2],
              },
              {
                x: item.box.min.x + item.position[0],
                y: item.box.max.y + item.position[1],
                z: item.box.max.z + item.position[2],
              },
            ],
        position: item.position,
      };
    });
  },
});
