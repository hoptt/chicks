// 서버측에서 emit 한 이벤트를 이 클라이언트에서 on 메서드로 처리해주는 부분
import { socket } from "@/sockets/clientSocket";
import { ObjectsAtom } from "@/store/ObjectsAtom";
import { MeAtom, PlayersAtom } from "@/store/PlayersAtom";
import { IObjects, IPlayer } from "@/types";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export const ClientSocketControls = () => {
  const [me, setMe] = useRecoilState(MeAtom);
  const setPlayers = useSetRecoilState(PlayersAtom);
  const setObjects = useSetRecoilState(ObjectsAtom);
  const handleConnect = () => {
    console.info("클라이언트- 연결됨");
  };
  const handleDisconnect = () => {
    console.info("클라이언트- 연결끊김");
  };
  const handleInitialize = (value: IPlayer) => {
    setMe(value);
    console.info("클라이언트- 초기화됨");
  };
  const handleEnter = () => {
    console.info("클라이언트- 입장함");
  };
  const handleExit = () => {
    console.info("클라이언트- 퇴장함");
  };
  const handlePlayers = (value: IPlayer[]) => {
    // console.info("클라이언트- 플레이어 관련 이벤트", value);
    setPlayers(value);
    const newMe = value.find(
      (player: IPlayer) => player && me && player.id === me.id
    );
    if (newMe) setMe(newMe);
  };
  const handleObjects = (value: IObjects[]) => {
    setObjects(value);
  };

  useEffect(() => {
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("initialize", handleInitialize);
    socket.on("enter", handleEnter);
    socket.on("exit", handleExit);
    socket.on("players", handlePlayers);
    socket.on("objects", handleObjects);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("initialize", handleInitialize);
      socket.off("enter", handleEnter);
      socket.off("exit", handleExit);
      socket.off("players", handlePlayers);
      socket.off("objects", handleObjects);
    };
  }, []);

  return null;
};
