import React from "react";
import Topbar from "../../components/Topbar/Topbar";
import Workspace from "../../components/Workspace/Workspace";
import { Problem } from "@/app/utils/types/problem";
import { problemsDB } from "@/app/mockProblems/problems2";

export default async function ProblemPage({
  params,
}: {
  params: { pid: string };
}) {
  // const hasMounted = useHasMounted();
  const { pid } = params;
  const problem = problemsDB.find(
    (problem) => problem.titleSlug == pid
  ) as Problem;
  return (
    <div>
      <Topbar problemPage />
      <Workspace problem={problem} />
    </div>
  );
}

export function generateStaticParams() {
  return problemsDB.map((problem) => {
    return problem.titleSlug;
  });
}
//TODO
// export async function getStaticPaths() {
// 	const paths = Object.keys(problems).map((key) => ({
// 		params: { pid: key },
// 	}));

// 	return {
// 		paths,
// 		fallback: false,
// 	};
// }

// export async function getStaticProps({ params }: { params: { pid: string } }) {
// 	const { pid } = params;
// 	const problem = problems[pid];

// 	if (!problem) {
// 		return {
// 			notFound: true,
// 		};
// 	}
// 	problem.handlerFunction = problem.handlerFunction.toString();
// 	return {
// 		props: {
// 			problem,
// 		},
// 	};
// }
