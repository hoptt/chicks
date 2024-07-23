import { useRecoilValue } from "recoil";
import MainCanvas from "./canvas/MainCanvas";
import CanvasLayout from "./canvasLayout/Layout";
import { CharacterSelectedFinishedAtom, MeAtom } from "@/store/PlayersAtom";
import Lobby from "./lobby/Lobby";

export default function Content() {
  const characterSelectedFinished = useRecoilValue(
    CharacterSelectedFinishedAtom
  );
  const me = useRecoilValue(MeAtom);
  if (characterSelectedFinished && me) {
    return (
      <CanvasLayout>
        <MainCanvas />
      </CanvasLayout>
    );
  }
  return <Lobby />;
}
