import { IPlayer } from "@/types";
type AllowedKeys = keyof IPlayer["keyEvt"];
export const ALLOW_KEYS: AllowedKeys[] = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Control",
  "Z",
  "Enter",
].map((key) => key.toUpperCase() as AllowedKeys);
