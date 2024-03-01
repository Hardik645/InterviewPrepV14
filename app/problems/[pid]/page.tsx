
import React from "react";
import useHasMounted from "../../hooks/useHasMounted";
import Topbar from "../../components/Topbar/Topbar";
import Workspace from "../../components/Workspace/Workspace";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/app/firebase/firebase";
import { Problem } from "@/app/utils/types/problem";



export default async function ProblemPage({ params }: { params: { pid: string } }) {
	// const hasMounted = useHasMounted();
	const {pid}=params;
	const q = query(collection(firestore, "problems"), where("titleSlug","==", pid));
	const querySnapshot = await getDocs(q);
	const problem:Problem[]=[];
	querySnapshot.forEach((doc) => {problem.push(doc.data() as Problem)});

	return (
		<div>
			<Topbar problemPage/>
			<Workspace problem={problem[0]} />
		</div>
	);
};

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
