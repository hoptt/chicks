export default function Content() {
  return (
    <div className="grid grid-cols-4 gap-5 py-4 px-3 border border-sky-100 rounded-md">
      <div className="flex flex-col gap-5 ">
        <div className="min-h-[70px] flex justify-center">
          <img
            alt="z"
            src="/images/arrow.webp"
            width={"80%"}
            className="me-3"
          />
        </div>

        <div className="mx-auto ">
          <p>방향키로 자유롭게</p>
          <p>움직여보세요!</p>
        </div>
      </div>

      <div className="flex flex-col gap-5  items-center">
        <div className="min-h-[70px] flex items-end">
          <img alt="z" src="/images/ctrl.webp" width={55} />
        </div>
        <p>잠깐 동안 하늘을 날아보세요!</p>
      </div>
      <div className="flex flex-col gap-5 items-center ">
        <div className="min-h-[70px] flex items-end">
          <img alt="z" src="/images/z.webp" width={55} />
        </div>
        <p>새로운 알을 낳아보세요!</p>
      </div>
      <div className="flex flex-col gap-5 items-center">
        <div className="min-h-[70px] flex items-end">
          <img alt="z" src="/images/enter.webp" />
        </div>
        <p>다른 유저들과 대화하며 즐거운 시간을 보내세요!</p>
      </div>
    </div>
  );
}
