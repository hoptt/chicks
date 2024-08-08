import { IPlayer } from "@/types";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";
import { Content } from "./Content";

type Props = {
  closeModal: () => void;
  player: IPlayer;
};
export default function Guestbook({ closeModal, player }: Props) {
  return (
    <Container>
      <Header closeModal={closeModal} />
      <Content player={player} />
    </Container>
  );
}

function Header({ closeModal }: { closeModal: () => void }) {
  return (
    <div className="flex justify-between mb-5">
      <span className="text-2xl font-bold">방명록</span>
      <IoMdClose size={25} className="cursor-pointer" onClick={closeModal} />
    </div>
  );
}

const Container = styled.section`
  width: 100%;
  height: 100%;
  max-width: 1080px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 1.25rem;
  border-radius: 0.25rem;
  color: white;
`;
