import { IoMdClose } from "react-icons/io";

export default function Header({ closeModal }: { closeModal: () => void }) {
  return (
    <div className="flex justify-between mb-5">
      <span className="text-2xl font-bold">플레이 방법</span>
      <IoMdClose size={25} className="cursor-pointer" onClick={closeModal} />
    </div>
  );
}
