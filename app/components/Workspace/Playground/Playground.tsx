import { tags as t } from '@lezer/highlight';
import { useState, useEffect } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { sublimeInit  } from "@uiw/codemirror-theme-sublime";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";import useLocalStorage from '@/app/hooks/useLocalStorage';
import { auth, firestore } from '@/app/firebase/firebase';
import { Problem } from '@/app/utils/types/problem';
import assert from 'assert';
import { useParams } from 'next/navigation';
;

type PlaygroundProps = {
	problem: Problem;
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
	setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
	fontSize: string;
	settingsModalIsOpen: boolean;
	dropdownIsOpen: boolean;
	lang:string;
}

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
	const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
	let [userCode, setUserCode] = useState<string>(problem.code);

	const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");

	const [settings, setSettings] = useState<ISettings>({
		fontSize: fontSize,
		settingsModalIsOpen: false,
		dropdownIsOpen: false,
		lang:"JavaScript",
	});

	const [user] = useAuthState(auth);
	const pid= useParams()["pid"];
	// console.log(typeof(JSON.parse((problem.answer).toLowerCase())[0]))
	const handleSubmit = async () => {
		if (!user) {
			toast.error("Please login to submit your code", {
				position: "top-center",
				autoClose: 3000,
				theme: "dark",
			});
			return;
		}
		//todo
		try {
			// userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
			// userCode=findStringDifferences(userCode,problem.code)
			userCode = userCode.slice(userCode.indexOf("function("));
			const cb = new Function(`return ${userCode}`)();
			// console.log(cb)
			const handler=(fn: any)=>{
				try {
					const tests = problem.tests
					const answers = problem.answer
					for (let i = 0; i < tests.length; i++) {
						const result = fn(tests[i]);
						assert.equal(result, answers[i]);
					}
					return true;
			} catch (error: any) {
				console.log("Error from Handler: ", error);
				throw new Error(error);
			};
			}

			if (typeof handler === "function") {	
				const success = handler(cb);
				if (success) {
					toast.success("Congrats! All tests passed!", {
						position: "top-center",
						autoClose: 3000,
						theme: "dark",
					});
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
					}, 4000);

					const userRef = doc(firestore, "users", user.uid);
					await updateDoc(userRef, {
						solvedProblems: arrayUnion(problem.id),
					});
					setSolved(true);
				}
			}
			} catch (error: any) {
			console.log(error.message);
			if (
				error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")
			) {
				toast.error("Oops! One or more test cases failed", {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			} else {
				toast.error(error.message, {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			}
		}
	};

	useEffect(() => {
		const code = localStorage.getItem(`code-${pid}`);
		if (user) {
			setUserCode(code ? JSON.parse(code) : problem?.code);
		} else {
			setUserCode(problem?.code);
		}
	}, [pid, user, problem?.code]);

	const onChange = (value: string) => {
		setUserCode(value);
		localStorage.setItem(`code-${pid}`, JSON.stringify(value));
	};

	return (
		<div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden'>
			<PreferenceNav settings={settings} setSettings={setSettings}/>

			<Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
				<div className='w-full overflow-auto pl-1'>
					<CodeMirror
						value={userCode}
						theme={sublimeInit({settings:{
							selection:"rgba(0, 173, 181,0.3)",
						},
						styles:[
							{ tag: [t.number, t.definition(t.tagName), t.className, t.definition(t.variableName)], color: '#00ADB5' },
						]
						})}
						onChange={onChange}
						extensions={[javascript()]}
						style={{ fontSize: settings.fontSize }}
					/>
				</div>
				<div className='w-full px-5 overflow-auto'>
					{/* testcase heading */}
					<div className='flex h-10 items-center space-x-6'>
						<div className='relative flex h-full flex-col justify-center cursor-pointer'>
							<div className='text-sm font-medium leading-5 text-white'>Testcases</div>
							<hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
						</div>
					</div>

					<div className='flex'>
						{problem?.examples.map((example, index) => (
							<div
								className='mr-2 items-start mt-2 '
								key={example.id}
								onClick={() => setActiveTestCaseId(index)}
							>
								<div className='flex flex-wrap items-center gap-y-4'>
									<div
										className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
										${activeTestCaseId === index ? "text-white" : "text-gray-400 text-opacity-70"}
									`}
									>
										Case {index + 1}
									</div>
								</div>
							</div>
						))}
					</div>

					<div className='font-semibold my-4'>
						<p className='text-sm font-medium mt-4 text-white'>Input:</p>
						<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
							{problem?.examples[activeTestCaseId].inputText}
						</div>
						<p className='text-sm font-medium mt-4 text-white'>Output:</p>
						<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
							{problem?.examples[activeTestCaseId].outputText}
						</div>
					</div>
				</div>
			</Split>
			<EditorFooter handleSubmit={handleSubmit} />
		</div>
	);
};
export default Playground;
