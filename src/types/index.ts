import { Water } from "three-stdlib";
import { Object3DNode } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      water: Object3DNode<Water, typeof Water>;
    }
  }
  interface Window {
    turnstile: any;
  }
}

type Chat = {
  id: string;
  message: string;
};

export interface IPlayer {
  id: string;
  uid: string;
  position: [number, number, number];
  name: string;
  keyEvt: {
    ArrowUp: boolean;
    ArrowDown: boolean;
    ArrowLeft: boolean;
    ArrowRight: boolean;
    Control: boolean;
    Z: boolean;
    Enter: boolean;
  };
  chat: Chat[];
  chick: IChick[];
}

export interface IObjects {
  id: number;
  name: string;
  value:
    | boolean
    | number
    | string[]
    | number[]
    | {
        id: number;
        player: string | undefined;
        position: [number, number, number];
      }[];
}

export interface IChick {
  id: string;
  isEgg: boolean;
  type: string;
  birthTime: number;
  crackTime: number;
  position: [number, number, number];
}

export interface InteractionCriclePortal {
  name: string;
  box: {
    max: { x: number; y: number; z: number };
    min: { x: number; y: number; z: number };
  };
  isMatrixUpdated: boolean;
  position: [number, number, number];
}

export interface ILike {
  id: string;
  uid: string;
  createdAt: string;
  user: IUser;
}

export interface IUser {
  id: string;
  uid: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  like: ILike;
}

export interface APIResponse<T> {
  status: number;
  data: T;
}

export interface IGuestbook {
  id: number;
  content: string;
  uid: string;
  createdAt: string;
  updatedAt: string;
  use: string;
}
