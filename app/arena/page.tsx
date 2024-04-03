"use client";

import { useState } from "react";
import Topbar from "../components/Topbar/Topbar";
import useHasMounted from "../hooks/useHasMounted";
import ProblemsTable from "../components/ProblemsTable/ProblemsTable";
import ArenaTimer from "../components/Timer/ArenaTimer";
import Carousel from "../components/Carousel.tsx/Carousel";

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

const Arena = () => {
	const [loadingProblems, setLoadingProblems] = useState(true);
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
						{
							imgSrc: "/hero-3.jpg",
							toHref: "https://discord.gg/eTAK3KUZBU",
						},
					]}
				/>
				<ArenaTimer />
				{/* <div className="relative overflow-x-auto mx-auto px-6 pb-10">
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
									<th
										scope="col"
										className="px-1 py-3 w-0 font-medium"
									>
										Status
									</th>
									<th
										scope="col"
										className="px-6 py-3 w-0 font-medium"
									>
										Title
									</th>
									<th
										scope="col"
										className="px-6 py-3 w-0 font-medium"
									>
										Difficulty
									</th>

									<th
										scope="col"
										className="px-6 py-3 w-0 font-medium"
									>
										Category
									</th>
									<th
										scope="col"
										className="px-6 py-3 w-0 font-medium"
									>
										Solution
									</th>
								</tr>
							</thead>
						)}
						<ProblemsTable
							setLoadingProblems={setLoadingProblems}
							searchValue={""}
							difficulty={"All"}
							category={[]}
						/>
					</table>
				</div> */}
			</main>
		</>
	);
};
export default Arena;
