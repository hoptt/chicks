import { APIResponse } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsDoorOpenFill } from "react-icons/bs";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

export const Statistics = () => {
  const [isLike, setIsLike] = useState<boolean | undefined>(false);
  const [likeCount, setLikeCount] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);

  const [isLikeLoading, setIsLikeLoading] = useState(false);

  const getTotalVisit = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/totalvisitor`
    );
    const { data, status }: APIResponse<{ allcount: number }> =
      await response.json();
    if (status === 200) {
      setVisitorCount(data.allcount);
    }
  };

  const getLike = async () => {
    setIsLikeLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/like/get`
    );
    const {
      data,
      status,
    }: APIResponse<{ isMyLike: boolean; allcount: number }> =
      await response.json();
    if (status === 200) {
      setIsLike(data.isMyLike);
      setLikeCount(data.allcount);
    }
    setIsLikeLoading(false);
  };
  const handleLike = async () => {
    if (isLikeLoading) return;
    // optimistic update
    if (isLike === undefined) {
      setIsLike(true);
      setLikeCount((prev) => prev + 1);
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      setIsLike((prev) => !prev);
      setLikeCount((prev) => prev + (isLike ? -1 : 1));
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/like/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    getLike();
  };

  useEffect(() => {
    getTotalVisit();
    getLike();
  }, []);

  return (
    <>
      <div
        className="relative flex justify-between items-end mb-3 text-xs text-gray-500 hover:text-gray-50"
        onClick={handleLike}
      >
        <div className="flex items-end gap-2 cursor-pointer">
          {isLike ? <IoMdHeart size={39} /> : <IoMdHeartEmpty size={39} />}
          <span>좋아요</span>
        </div>
        <AnimatePresence>
          <motion.span
            key={likeCount}
            className="absolute botoom-0 right-0 translate-x-[-50%]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {likeCount}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="flex justify-between items-end text-xs text-gray-500 hover:text-gray-50">
        <div className="flex items-end gap-2">
          <BsDoorOpenFill size={39} />
          <span>총 방문자</span>
        </div>
        <span>{visitorCount}</span>
      </div>
    </>
  );
};
