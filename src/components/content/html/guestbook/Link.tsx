import toast from "react-hot-toast";
import {
  AiOutlineCopy,
  AiFillTwitterSquare,
  AiFillFacebook,
} from "react-icons/ai";

export const Link = () => {
  const handleCopyLink = () => {
    if (navigator.clipboard && window) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => toast.success("링크가 복사되었습니다"))
        .catch(() => toast.error("다시 시도해주세요"));
    }
  };

  const handleShareTwitter = () => {
    typeof window !== "undefined" &&
      window.open(
        `https://www.twitter.com/intent/tweet?url=${window.location.href}`
      );
  };
  const handleShareFacebook = () => {
    typeof window !== "undefined" &&
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
      );
  };
  return (
    <div className="flex-grow">
      <div className="grid grid-cols-1 gap-2 h-full content-end">
        <button
          type="button"
          onClick={handleCopyLink}
          className="border border-gray-500  text-gray-500 hover:border-gray-300 hover:text-gray-50 font-semibold rounded-md px-3 py-2 flex items-center gap-4"
        >
          <AiOutlineCopy className="text-xl md:text-3xl" />
          링크 복사
        </button>
        <button
          type="button"
          onClick={handleShareTwitter}
          className="border border-gray-500  text-gray-500 hover:border-gray-300 hover:text-gray-50 font-semibold rounded-md px-3 py-2 flex items-center gap-4"
        >
          <AiFillTwitterSquare className="text-xl md:text-3xl " />
          트위터
        </button>

        <button
          type="button"
          onClick={handleShareFacebook}
          className="border border-gray-500  text-gray-500 hover:border-gray-300 hover:text-gray-50 font-semibold rounded-md px-3 py-2 flex items-center gap-4"
        >
          <AiFillFacebook className="text-xl md:text-3xl " />
          페이스북
        </button>
      </div>
    </div>
  );
};
