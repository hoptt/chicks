import { IPlayer } from "@/types";
type AllowedKeys = keyof IPlayer["keyEvt"];
export const ALLOW_KEYS: AllowedKeys[] = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "W",
  "A",
  "S",
  "D",
  " ", // Spacebar
  "Z",
  "Enter",
].map((key) => key.toUpperCase() as AllowedKeys);

export const MAXIMUM_PLAYERS = 8;
