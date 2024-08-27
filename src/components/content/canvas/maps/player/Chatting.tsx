import { IPlayer } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
type Props = {
  chat: IPlayer["chat"];
  keyEvt: IPlayer["keyEvt"];
  chatMessage: React.MutableRefObject<string>;
  isPlayerMe: boolean;
};
const dms = 33;
function Chatting({ chat, chatMessage, isPlayerMe, keyEvt }: Props) {
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatWidthHelperRef = useRef<HTMLSpanElement>(null);
  const [localMsg, setLocalmsg] = useState("");

  useEffect(() => {
    if (!localMsg) return;
    chatInputRef.current!.style.width = `${
      chatWidthHelperRef.current!.offsetWidth
    }px`;
  }, [localMsg]);
  return (
    <>
      <div
        style={{
          position: "relative",
          top: `-${chat.length * dms + 20}px`,
          fontWeight: 600,
          backgroundColor: "#232323",
          color: "#cec9c8",
        }}
      >
        <AnimatePresence>
          {chat.map(({ id, message }, idx) => (
            <ChatLog
              key={id}
              Enter={keyEvt.Enter}
              idx={idx}
              message={message}
            />
          ))}
          {keyEvt.Enter && (
            <>
              <ChatBox
                chat={chat}
                chatInputRef={chatInputRef}
                chatMessage={chatMessage}
                isPlayerMe={isPlayerMe}
                setLocalmsg={setLocalmsg}
              />
            </>
          )}
        </AnimatePresence>
      </div>

      <ChatWidthHelper
        chatWidthHelperRef={chatWidthHelperRef}
        localMsg={localMsg}
      />
    </>
  );
}

export default memo(Chatting);

type ChatLogProps = {
  message: string;
  Enter: boolean;
  idx: number;
};
const ChatLog = memo(function ChatLog({ Enter, idx, message }: ChatLogProps) {
  return (
    <SpeechBox
      style={{
        top: `${Enter ? idx * dms - dms : idx * dms}px`,
      }}
      initial={{ opacity: 0, scale: 0.5, x: "-50%" }}
      animate={{
        opacity: [0, 1],
        scale: [0.5, 1],
        transition: {
          duration: 0.25,
          type: "spring",
        },
      }}
      exit={{
        opacity: 0,

        y: [-dms, -dms - 2.5],
        transition: {
          duration: 0.25,
          ease: "easeInOut",
        },
      }}
    >
      {message}
    </SpeechBox>
  );
});

type ChatBoxProps = {
  chat: IPlayer["chat"];
  isPlayerMe: boolean;
  chatInputRef: React.RefObject<HTMLInputElement>;
  chatMessage: React.MutableRefObject<string>;
  setLocalmsg: React.Dispatch<React.SetStateAction<string>>;
};
const ChatBox = memo(function ChatBox({
  chat,
  chatInputRef,
  chatMessage,
  isPlayerMe,
  setLocalmsg,
}: ChatBoxProps) {
  return (
    <Container
      $top={(chat.length - 1) * dms}
      initial={{ scale: 0 }}
      animate={{
        scale: [0, 1],
        transition: { duration: 0.25, type: "spring" },
      }}
    >
      {isPlayerMe ? (
        <ChatInput
          ref={chatInputRef}
          autoFocus
          spellCheck={false}
          onChange={(e) => {
            chatMessage.current = e.target.value;
            setLocalmsg(e.target.value);
          }}
        />
      ) : (
        <ChatWaitting />
      )}
    </Container>
  );
});

type ChatWidthHelperProps = {
  chatWidthHelperRef: React.RefObject<HTMLSpanElement>;
  localMsg: string;
};
const ChatWidthHelper = memo(function ChatWidthHelper({
  chatWidthHelperRef,
  localMsg,
}: ChatWidthHelperProps) {
  return <WidthHelper ref={chatWidthHelperRef}>{localMsg}</WidthHelper>;
});

const ChatInput = styled.input`
  position: absolute;
  cursor: default;
  outline: none;
  border: none;
  white-space: pre;
  width: 40px;
  min-width: 40px;
  max-width: 200px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  border-radius: 0.5rem;
  padding: 0.35rem 0.5rem;
  font-weight: 600;
  background-color: inherit;
  color: inherit;
  text-align: center;
`;

// input 의 크기를 동적으로 변경하기 위한 방법
const WidthHelper = styled.span`
  position: absolute;
  visibility: hidden;
  padding: 0.35rem 0.75rem;
  white-space: pre;
  font-size: 1rem;
`;

const dots = keyframes`
  0%{
    color: rgba(0, 0, 0, 0);
    text-shadow: 0.35rem 0 0 rgba(0, 0, 0, 0), 0.7rem 0 0 rgba(0, 0, 0, 0);
  }

  10% {
    color: white;
    text-shadow: 0.35rem 0 0 rgba(0, 0, 0, 0), 0.7rem 0 0 rgba(0, 0, 0, 0);
  }

  20% {
    text-shadow: 0.35rem 0 0 white, 0.7rem 0 0 rgba(0, 0, 0, 0);
  }

  30%,
  100% {
    text-shadow: 0.35rem 0 0 white, 0.7rem 0 0 white;
  }
`;

const ChatWaitting = styled.span`
  position: absolute;
  padding: 0.25rem 0.5rem;
  background-color: inherit;
  letter-spacing: 2px;
  border-radius: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  font-weight: 600;
  &:after {
    content: " .";
    letter-spacing: 12px;
    animation: ${dots} 3s steps(1, end) infinite;
  }
`;

const SpeechBox = styled(motion.div)`
  position: absolute;
  background-color: inherit;
  white-space: pre;
  min-width: 40px;
  max-width: fit-content;
  left: 50%;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  text-align: center;
`;

const Container = styled(motion.div)<{ $top: number }>`
  position: absolute;
  background-color: inherit;
  top: ${(props) => props.$top}px;
`;
