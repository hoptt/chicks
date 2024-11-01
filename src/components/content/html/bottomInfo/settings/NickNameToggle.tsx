type ToggleProps = {
  nicknameToggle: boolean;
  onToggleNickname: () => void;
};

export default function NickNameToggle({
  nicknameToggle,
  onToggleNickname,
}: ToggleProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs text-gray-300 font-bold">닉네임</span>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value={`${nicknameToggle}`}
          className="sr-only peer"
          onChange={onToggleNickname}
          checked={nicknameToggle}
        />
        <div className="scale-[65%] origin-right relative w-11 h-6 bg-gray-400 rounded-full peer dark:bg-gray-700 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
      </label>
    </div>
  );
}
