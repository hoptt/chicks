import { socket } from "@/sockets/clientSocket";
import {
  CharacterSelectedFinishedAtom,
  PlayersAtom,
} from "@/store/PlayersAtom";
import { isDev, isValidText } from "@/utils";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { PiUsersFill } from "react-icons/pi";
import styled from "styled-components";
import { APIResponse, IUser } from "@/types";
import CFsecret from "../security/CFsecret";

const maximumPlayers = 8;
export default function Lobby() {
  const players = useRecoilValue(PlayersAtom);
  const [error, setError] = useState(0);
  const [cfsc, setCfsc] = useState(isDev ? true : false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempNickname, setTempNickname] = useState("");
  const isDuplicate =
    players.findIndex((player) => player.name === tempNickname) !== -1;
  const isFull = players.length >= maximumPlayers;
  const setCharacterSelectedFinished = useSetRecoilState(
    CharacterSelectedFinishedAtom
  );

  useEffect(() => {
    setError(players.length >= maximumPlayers ? 3 : 0);
  }, [players.length]);

  const handleCf = (status: number) => {
    setCfsc(status === 200 ? true : false);
  };

  const handleEnter = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/add-players`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: tempNickname.trim() }),
        }
      );

      const { data, status }: APIResponse<{ user: IUser }> =
        await response.json();

      if (status === 200) {
        socket.emit("initialize", {
          tempName: data.user.name,
          uid: data.user.uid,
        });
        setCharacterSelectedFinished(true);
      } else {
        setError(5);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <UserCount>
        <PiUsersFill size={25} />
        <div
          style={{
            marginLeft: "1rem",
            fontSize: "15px",
            letterSpacing: "2px",
            fontWeight: 600,
          }}
        >
          {players.length}/{maximumPlayers}
        </div>
      </UserCount>
      <Input
        placeholder="이름을 입력해주세요"
        onChange={(e) => {
          setTempNickname(e.currentTarget.value);
        }}
        value={tempNickname}
        onKeyUp={(e) => {
          if (isLoading) return setError(0);
          if (!cfsc) return setError(4);
          if (!isValidText(tempNickname)) return setError(1);
          if (isDuplicate) return setError(2);
          if (isFull) return setError(3);
          setError(0);
          if (e.key === "Enter") {
            handleEnter();
          }
        }}
      />
      <WarningMessage>
        {error === 1 && <>6글자 이하로 입력해주세요</>}
        {error === 2 && <>이미 사용중인 이름이에요</>}
        {error === 3 && <>앗! 인원이 가득 찼어요</>}
        {error === 4 && <>입장이 제한되었습니다</>}
        {error === 5 && <>서버 통신 중 오류가 발생하였습니다</>}
      </WarningMessage>
      {!isDev && <CFsecret handleCf={handleCf} />}

      <NextBtn
        disabled={
          !isValidText(tempNickname) ||
          isDuplicate ||
          isFull ||
          !cfsc ||
          isLoading
        }
        onClick={handleEnter}
      >
        {cfsc ? (isLoading ? "로딩중" : "입장하기") : "입장제한"}
      </NextBtn>
    </Container>
  );
}
const Container = styled.div`
  width: 300px;
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserCount = styled.div`
  display: flex;
  align-items: center;
  background-color: #7f7f7f;
  margin-left: auto;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
`;

const WarningMessage = styled.span`
  display: block;
  margin: 0.5rem 0;
  text-align: center;
  color: #4460bd;
  font-weight: 600;
`;

const Input = styled.input`
  font-size: 24px;
  border: none;
  outline: none;
  padding: 12px 10px;
  margin-top: 0.5rem;
  border-radius: 8px;
  width: 100%;
  font-size: 18px;
`;

const NextBtn = styled.button`
  padding: 15px;
  width: 100%;
  font-size: 18px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-weight: 600;
  transition-duration: 0.2s;

  background-color: #6731a1;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #340070;
  }

  &:disabled {
    background-color: #8aceff;
    color: #ededed;
    cursor: not-allowed;
  }
`;
