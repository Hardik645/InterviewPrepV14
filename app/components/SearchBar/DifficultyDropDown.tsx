export const DifficultyDropDown = ({
  difficulty,
  setDifficulty,
}: {
  difficulty: "All" | "Easy" | "Medium" | "Hard";
  setDifficulty: React.Dispatch<
    React.SetStateAction<"All" | "Easy" | "Medium" | "Hard">
  >;
}) => {
  return (
    <>
      <select
        onChange={(event) => {
          setDifficulty(
            event.target.value as "All" | "Easy" | "Medium" | "Hard"
          );
        }}
        value={difficulty}
        className="bg-dark-layer-1 text-[#939aa7] rounded-full opacity-75 focus-within:opacity-100 text-center focus:outline-none px-2 py-[11px] text-lg"
        required
      >
        <option value="All" hidden>
          Difficulty
        </option>
        <option value="Easy" className="text-dark-green-s">
          Easy
        </option>
        <option value="Medium" className="text-dark-yellow ">
          Medium
        </option>
        <option value="Hard" className="text-dark-pink ">
          Hard
        </option>
      </select>
    </>
  );
};
