import styled from "styled-components";

export default function Content() {
  return (
    <>
      <div className="grid grid-cols-3 h-full gap-5 items-center">
        <div className="col-span-1 flex flex-col items-center">
          <Icon className="icon icon1 w-[70px] h-[75px]" />
          <span className="text-gray-300 text-sm mt-3">알을 낳아보세요!</span>
        </div>
        <div className="col-span-1 flex flex-col items-center">
          <Icon className="icon icon2 w-[210px] h-[75px]" />
          <span className="text-gray-300 text-sm mt-3">
            잠깐 동안 하늘을 날아보세요!
          </span>
        </div>
        <div className="col-span-1 flex flex-col items-center">
          <Icon className="icon icon3 w-[120px] h-[75px]" />
          <span className="text-gray-300 text-sm mt-3">
            다른 유저들과 대화해보세요!
          </span>
        </div>
      </div>
    </>
  );
}

const Icon = styled.div`
  background-image: url("/images/sub.webp");
  background-size: 400px 75px;
  filter: brightness(0.7);

  &.icon1 {
    background-position: 0% top;
  }

  &.icon2 {
    background-position: 36% top;
  }
  &.icon3 {
    background-position: 100% top;
  }
`;
