import { IPlayer } from "@/types";
import { atom } from "recoil";

// 입장
export const CharacterSelectedFinishedAtom = atom({
  key: "characterSelectedFinishedAtom",
  default: false,
});

// 내 정보 저장
export const MeAtom = atom<IPlayer | undefined>({
  key: "MeAtom",
  default: undefined,
});

// 모든 유저
export const PlayersAtom = atom<IPlayer[]>({
  key: "PlayersAtom",
  default: [],
});
