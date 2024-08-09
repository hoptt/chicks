import { IObjects } from "@/types";
import { atom, selector } from "recoil";

// 모든 objects
export const ObjectsAtom = atom<IObjects[]>({
  key: "ObjectsAtom",
  default: [],
});

// frontdoor
export const FrontdoorAtom = selector({
  key: "FrontdoorAtom",
  get: ({ get }) => {
    const pb = get(ObjectsAtom);
    const frontdoor = pb.find((item) => item.name === "frontdoor")!;
    return frontdoor;
  },
});
