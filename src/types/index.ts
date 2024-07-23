export interface IPlayer {
  id: string;
  position: [number, number, number];
  name: string;
  keyEvt: {
    ArrowUp: boolean;
    ArrowDown: boolean;
    ArrowLeft: boolean;
    ArrowRight: boolean;
    Control: boolean;
    Z: boolean;
  };
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
