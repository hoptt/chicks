import { IPlayer } from "@/types";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Comment } from "./Comment";
import { Statistics } from "./Statistics";
import { Link } from "./Link";

export function Content({ player }: { player: IPlayer }) {
  useEffect(() => {
    return () => toast.dismiss();
  }, []);

  return (
    <div className="grid grid-cols-4 h-full gap-3">
      <div className="col-span-3 flex flex-col">
        <Comment player={player} />
      </div>
      <div className="col-span-1 flex flex-col">
        <Statistics />
        <Link />
      </div>
    </div>
  );
}
