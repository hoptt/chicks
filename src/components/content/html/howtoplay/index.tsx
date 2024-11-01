import styled from "styled-components";
import Content from "./Content";
import Header from "./Header";

type Props = {
  closeModal: () => void;
};
export default function HowToPlay({ closeModal }: Props) {
  return (
    <Container>
      <Header closeModal={closeModal} />
      <Content />
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  height: 100%;
  max-width: 1080px;
  height: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 1.25rem;
  border-radius: 0.25rem;
  color: white;
`;
