import { InteractionCriclePortal } from "@/types";
import { atom, selector } from "recoil";

// 불빛 상호작용 포탈
export const IsInsideLightPortalAtom = atom({
  key: "IsInsideLightPortal",
  default: false,
});

// 방명록 상호작용 포탈
export const IsInsideGuestbookAtom = atom({
  key: "IsInsideGuestbook",
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
                z: item.box.max.z,
              },
              {
                x: item.box.max.x,
                z: item.box.min.z,
              },
              {
                x: item.box.min.x,
                z: item.box.min.z,
              },
              {
                x: item.box.min.x,
                z: item.box.max.z,
              },
            ]
          : [
              {
                x: item.box.max.x + item.position[0],
                z: item.box.max.z + item.position[2],
              },
              {
                x: item.box.max.x + item.position[0],
                z: item.box.min.z + item.position[2],
              },
              {
                x: item.box.min.x + item.position[0],
                z: item.box.min.z + item.position[2],
              },
              {
                x: item.box.min.x + item.position[0],
                z: item.box.max.z + item.position[2],
              },
            ],
        position: item.position,
      };
    });
  },
});
