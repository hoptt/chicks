import { IGuestbook, APIResponse, IPlayer } from "@/types";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AnimatePresence, motion } from "framer-motion";
dayjs.extend(utc);

type Props = {
  player: IPlayer;
};
export const Comment = ({ player }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textareaEditRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [guestbookCount, setGuestbookCount] = useState(0);
  const [editId, setEditId] = useState(0);
  const [guestbook, setGuestbook] = useState<IGuestbook[]>([]);

  const getGuestbook = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/guestbook/get`
    );
    const {
      data,
      status,
    }: APIResponse<{ guestbook: IGuestbook[]; allcount: number }> =
      await response.json();
    if (status === 200) {
      setGuestbook(data.guestbook);
      setGuestbookCount(data.allcount);
    }
  };

  const handleWrite = async () => {
    if (!textareaRef.current?.value) {
      toast.error("내용을 입력해주세요");
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/guestbook/write`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: textareaRef.current?.value }),
      }
    );
    const { status }: APIResponse<{}> = await response.json();
    if (status === 200) {
      toast.success("방명록이 등록되었습니다");
      scrollRef.current!.scrollTop = 0;
      textareaRef.current!.value = "";
    } else {
      toast.error("다시 시도해주세요");
    }
    getGuestbook();
  };

  const handleUpdate = async (type: number, id: number) => {
    // type 0 삭제 / 1 수정
    if (type === 1 && !textareaEditRef.current?.value) {
      toast.error("내용을 입력해주세요");
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/guestbook/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body:
          type === 1
            ? JSON.stringify({
                content: textareaEditRef.current?.value,
                type,
                guestbookId: id,
              })
            : JSON.stringify({ type, guestbookId: id }),
      }
    );
    const { status }: APIResponse<{}> = await response.json();
    if (status === 200) {
      toast.success(`방명록이 ${type === 1 ? "수정" : "삭제"}되었습니다`);
      setEditId(0);
    } else {
      toast.error("다시 시도해주세요");
    }
    getGuestbook();
  };

  const handleDelete = async (id: number) => {
    toast(
      (t) => (
        <span>
          해당 방명록을 <b>삭제</b>하시겠습니까?
          <button
            type="button"
            className="text-red-500 ml-2 font-bold"
            onClick={() => {
              toast.dismiss(t.id);
              handleUpdate(0, id);
            }}
          >
            예
          </button>
        </span>
      ),
      {
        duration: 5000,
      }
    );
  };

  useEffect(() => {
    getGuestbook();
  }, []);

  return (
    <>
      <div ref={scrollRef} className="flex-grow mb-5 overflow-y-auto h-0 pr-2">
        <AnimatePresence>
          {guestbook.map((book) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0.5, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-800 p-2 rounded-md mb-3 text-gray-500 hover:border-gray-50 hover:text-gray-50"
            >
              <div className="flex justify-between">
                <span className="text-xs">
                  {dayjs.utc(book.createdAt).format("YY-MM-DD HH:mm")}
                </span>
                {book.uid === player.uid && (
                  <div className="text-sm">
                    <button
                      type="button"
                      className="mr-2"
                      onClick={() => setEditId(book.id)}
                    >
                      수정
                    </button>

                    <button type="button" onClick={() => handleDelete(book.id)}>
                      삭제
                    </button>
                  </div>
                )}
              </div>
              {editId !== book.id && (
                <div className="whitespace-pre-wrap">{book.content}</div>
              )}
              {editId === book.id && (
                <div className="w-full flex gap-2 border border-white p-2 rounded-md mt-3">
                  <textarea
                    ref={textareaEditRef}
                    defaultValue={book.content}
                    placeholder="수정할 내용을 입력해주세요"
                    onKeyDown={(e) => e.stopPropagation()}
                    onKeyUp={(e) => e.stopPropagation()}
                    className="w-full outline-none resize-none bg-inherit"
                  />
                  <div>
                    <button
                      type="button"
                      className="w-max px-3 h-full border border-gray-500 rounded-md text-gray-500 hover:text-gray-50 hover:border-gray-50"
                      onClick={() => handleUpdate(1, book.id)}
                    >
                      수정
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="w-full flex gap-2 border border-white p-2 rounded-md">
        <textarea
          ref={textareaRef}
          placeholder={`총 ${guestbookCount}개의 방명록이 등록되었어요! 방명록을 남겨주세요`}
          onKeyDown={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
          className="w-full outline-none resize-none bg-inherit"
        />
        <div>
          <button
            type="button"
            className="w-max px-3 h-full border border-gray-500 rounded-md text-gray-500 hover:text-gray-50 hover:border-gray-50"
            onClick={handleWrite}
          >
            등록
          </button>
        </div>
      </div>
    </>
  );
};
