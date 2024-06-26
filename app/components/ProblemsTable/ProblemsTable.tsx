"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import YouTube from "react-youtube";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { DBProblem } from "@/app/utils/types/problem";
import { auth, firestore } from "@/app/firebase/firebase";
import { Problem, problemsDB } from "@/app/mockProblems/problems2";

type ProblemsTableProps = {
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
  searchValue: string;
  difficulty: "All" | "Easy" | "Medium" | "Hard";
  category: string[];
};

const ProblemsTable: React.FC<ProblemsTableProps> = ({
  setLoadingProblems,
  searchValue,
  difficulty,
  category,
}) => {
  const [youtubePlayer, setYoutubePlayer] = useState({
    isOpen: false,
    videoId: "",
  });
  //   const [defaultProblems, setDefaultProblems] = useState(problemsDB);
  const problems = useGetProblems(
    setLoadingProblems,
    searchValue,
    difficulty,
    category
  );
  // console.log(JSON.stringify(problems))
  const solvedProblems = useGetSolvedProblems();
  const closeModal = () => {
    setYoutubePlayer({ isOpen: false, videoId: "" });
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <tbody className="text-white">
        {problems.map((problem, idx) => {
          const difficulyColor =
            problem.difficulty === "Easy"
              ? "text-dark-green-s"
              : problem.difficulty === "Medium"
              ? "text-dark-yellow"
              : "text-dark-pink";
          return (
            <tr
              className={`${idx % 2 == 1 ? "bg-dark-layer-1" : ""}`}
              key={problem.id}
            >
              <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s flex justify-center">
                {solvedProblems.includes(problem.id.toString()) && (
                  <BsCheckCircle fontSize={"24"} width="18" />
                )}
              </th>
              <td className="px-6 py-4 min-w-[250px]">
                <Link
                  className="hover:text-pale-blue cursor-pointer"
                  href={`/problems/${problem.titleSlug}`}
                >
                  {`${problem.id.toString()}. ${problem.title}`}
                </Link>
              </td>
              <td className={`px-6 py-4 font-semibold ${difficulyColor}`}>
                {problem.difficulty}
              </td>
              <td className={"px-6 py-4 min-w-[290px]"}>
                <ul className="flex flex-wrap gap-1 ">
                  {problem.topics.map((topic, index) => {
                    return (
                      <li
                        key={index}
                        className="bg-[#505762] rounded-full py-1 px-2 text-[#abb1ba]"
                      >
                        {topic}
                      </li>
                    );
                  })}
                </ul>
              </td>
              <td className={"px-6 py-4"}>
                {problem.videoId ? (
                  <AiFillYoutube
                    fontSize={"28"}
                    className="cursor-pointer hover:text-red-600"
                    onClick={() =>
                      setYoutubePlayer({
                        isOpen: true,
                        videoId: problem.videoId as string,
                      })
                    }
                  />
                ) : (
                  <p className="text-gray-400">Coming soon</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
      {youtubePlayer.isOpen && (
        <tfoot className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
          <div
            className="bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute"
            onClick={closeModal}
          ></div>
          <div className="w-full z-50 h-full px-6 relative max-w-4xl">
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="w-full relative">
                <IoClose
                  fontSize={"35"}
                  className="cursor-pointer absolute -top-16 right-0"
                  onClick={closeModal}
                />
                <YouTube
                  videoId={youtubePlayer.videoId}
                  loading="lazy"
                  iframeClassName="w-full min-h-[500px]"
                />
              </div>
            </div>
          </div>
        </tfoot>
      )}
    </>
  );
};
export default ProblemsTable;

function useGetProblems(
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>,
  searchValue: string,
  difficulty: "All" | "Easy" | "Medium" | "Hard",
  category: string[]
) {
  const [problems, setProblems] = useState<Problem[]>(problemsDB);
  // console.log(searchValue);
  useEffect(() => {
    const getProblems = async () => {
      setLoadingProblems(true);
      setProblems(problemsDB);
      setLoadingProblems(false);
    };
    if (searchValue === "" && difficulty === "All" && category.length === 0)
      getProblems();
    else
      setProblems(
        problems.filter((problem) =>
          problem.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
  }, [setLoadingProblems, searchValue, problems]);

  useEffect(() => {
    const getProblems = () => {
      setLoadingProblems(true);
      setProblems(
        problems.filter((problem) => problem.difficulty === difficulty)
      );
      setLoadingProblems(false);
    };
    if (difficulty === "All") setProblems(problemsDB);
    else getProblems();
  }, [difficulty]);

  useEffect(() => {
    const getProblems = () => {
      setProblems(
        problems.filter((problem) =>
          category.every((cat) => problem.topics.includes(cat))
        )
      );
    };
    if (category.length === 0) setProblems(problemsDB);
    else getProblems();
  }, [category]);
  return problems;
}

function useGetSolvedProblems() {
  const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getSolvedProblems = async () => {
      const userRef = doc(firestore, "users", user!.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setSolvedProblems(userDoc.data().solvedProblems);
      }
    };

    if (user) getSolvedProblems();
    if (!user) setSolvedProblems([]);
  }, [user]);

  return solvedProblems;
}
