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
  ip: string;
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
  userIp: string;
  createdAt: string;
  user: IUser;
}

export interface IUser {
  id: string;
  ip: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  like: ILike;
}

export interface APIResponse<T> {
  status: number;
  data: T;
}
