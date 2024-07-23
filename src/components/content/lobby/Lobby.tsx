import { socket } from "@/sockets/clientSocket";
import { CharacterSelectedFinishedAtom } from "@/store/PlayersAtom";
import { isValidText } from "@/utils";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

export default function Lobby() {
  const [tempNickname, setTempNickname] = useState("");
  const setCharacterSelectedFinished = useSetRecoilState(
    CharacterSelectedFinishedAtom
  );
  return (
    <div>
      <Input
        autoFocus
        placeholder="이름을 입력해주세요"
        onChange={(e) => {
          setTempNickname(e.currentTarget.value);
        }}
        value={tempNickname}
        onKeyUp={(e) => {
          if (!isValidText(tempNickname)) return;
          if (e.key === "Enter") {
            socket.emit("initialize", {
              tempName: tempNickname,
            });
            setCharacterSelectedFinished(true);
          }
        }}
      />
      <NextBtn
        className={!tempNickname ? "disabled" : "valid"}
        onClick={() => {
          if (!tempNickname) return;
          socket.emit("initialize", {
            tempName: tempNickname,
          });
          setCharacterSelectedFinished(true);
        }}
      >
        입장하기
      </NextBtn>
    </div>
  );
}

const Input = styled.input`
  font-size: 24px;
  border: none;
  outline: none;
  padding: 12px 10px;
  border-radius: 8px;
  width: 280px;
  font-size: 18px;
`;

const NextBtn = styled.button`
  padding: 10px;
  width: 280px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-weight: 600;
  transition-duration: 0.2s;
  &.valid {
    background-color: #6731a1;
    color: #fff;
    cursor: pointer;
    &:hover {
      background-color: #340070;
    }
  }

  &.disabled {
    background-color: #8aceff;
    color: #ededed;
    cursor: not-allowed;
  }
`;
