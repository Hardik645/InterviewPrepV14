"use client";
import { useState } from "react";
import Topbar from "./components/Topbar/Topbar";
import useHasMounted from "./hooks/useHasMounted";
import ProblemsTable from "./components/ProblemsTable/ProblemsTable";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { DifficultyDropDown } from "./components/SearchBar/DifficultyDropDown";
import { CategorySelect } from "./components/SearchBar/CategorySelect";
import Carousel from "./components/Carousel.tsx/Carousel";

export default function Home() {
  const [loadingProblems, setLoadingProblems] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [difficulty, setDifficulty] = useState<
    "All" | "Easy" | "Medium" | "Hard"
  >("All");
  const [category, setCategory] = useState<string[]>([] as string[]);
  const hasMounted = useHasMounted();

  if (!hasMounted) return null;
  return (
    <>
      <main className="bg-dark-layer-2 min-h-screen">
        <Topbar />
        <Carousel
          images={[
            { imgSrc: "/hero-1.jpg", toHref: "/arena" },
            { imgSrc: "/hero-2.jpg", toHref: "/premium" },
            { imgSrc: "/hero-3.jpg", toHref: "https://discord.gg/eTAK3KUZBU" },
          ]}
        />
        <h1
          className="text-2xl text-center text-gray-700 dark:text-gray-300 font-medium
				uppercase mt-10 mb-5"
        >
          &ldquo; GRIND NOW, SHINE LATER &rdquo; 👇
        </h1>
        <div className="flex justify-center mb-2 mt-9 items-center gap-2">
          <SearchBar inputValue={searchValue} setInputValue={setSearchValue} />
          <DifficultyDropDown
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
          <CategorySelect category={category} setCategory={setCategory} />
          <div
            onClick={() => {
              setSearchValue("");
              setDifficulty("All");
              setCategory([]);
            }}
            className="text-red-700 font-light cursor-pointer hover:underline"
          >
            Clear All
          </div>
        </div>
        <div className="relative overflow-x-auto mx-auto px-6 pb-10">
          {loadingProblems && (
            <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
              {[...Array(10)].map((_, idx) => (
                <LoadingSkeleton key={idx} />
              ))}
            </div>
          )}
          <table className="text-sm text-left text-gray-700 dark:text-gray-400 sm:w-7/12 md:w-10/12 w-full max-w-[1200px] mx-auto">
            {!loadingProblems && (
              <thead className="text-xs text-gray-300 uppercase dark:text-gray-300 border-b ">
                <tr>
                  <th scope="col" className="px-1 py-3 w-0 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 w-0 font-medium">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 w-0 font-medium">
                    Difficulty
                  </th>

                  <th scope="col" className="px-6 py-3 w-0 font-medium">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 w-0 font-medium">
                    Solution
                  </th>
                </tr>
              </thead>
            )}
            <ProblemsTable
              setLoadingProblems={setLoadingProblems}
              searchValue={searchValue}
              difficulty={difficulty}
              category={category}
            />
          </table>
        </div>
      </main>
    </>
  );
}
const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-6 h-6 shrink-0 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
