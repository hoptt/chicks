import styled from "styled-components";

export default function Guestbook() {
  return (
    <Container>
      <Header />

      <Content />
    </Container>
  );
}

function Header() {
  return (
    <div className="flex justify-between mb-5">
      <span className="text-2xl font-bold">방명록</span>
      <div>X</div>
    </div>
  );
}
function Content() {
  return (
    <div className="grid grid-cols-4 h-full">
      <div className="col-span-3">
        1ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
        ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
      </div>
      <div className="col-span-1">
        <div>좋아요</div>
        <div>방문횟수</div>
        <div>링크복사</div>
      </div>
    </div>
  );
}

const Container = styled.section`
  width: 100%;
  height: 100%;
  max-width: 1280px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 2rem;
  border-radius: 1rem;
  color: white;
`;
