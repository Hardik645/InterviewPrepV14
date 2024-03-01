"use client";
import Link from "next/link";
import { useNavContext } from "@/app/context/NavContext";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "../Buttons/Logout";
import Image from "next/image";
import Timer from "../Timer/Timer";
import { auth } from "@/app/firebase/firebase";

type TopbarProps = {
	problemPage?: boolean;
};
const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
	const [user] = useAuthState(auth);
	const {setAuthModalState} = useNavContext();

	return (
		<nav className='relative flex h-[50px] w-full shrink-0 items-center px-10 py-7 bg-dark-layer-1 text-dark-gray-7'>
			<div className={`flex w-full items-center justify-between ${!problemPage ? "max-w-[1200px] mx-auto" : ""}`}>
				<Link href='/' className='h-[22px] flex-1 mb-3'>
					<h1 className="text-3xl font-bold text-white/90 hover:text-white">&#x2770; InterviewPrep /&#x2771;</h1>
				</Link>

				<div className='flex items-center space-x-4 flex-1 justify-end'>
					<div >
						<button
							className='btn-hover-2 color-9 hover:scale-110 transition duration-500'
						>
							<Link href={"/premium"}>Premium</Link>
						</button>
					</div>
					{!user && (
						<Link
							href='/auth'
							onClick={() => setAuthModalState((prev) => ({ ...prev, isOpen: true, type: "login" }))}
						>
							<button className='bg-dark-fill-3 py-1 px-2 cursor-pointer rounded '>Sign In</button>
						</Link>
					)}
					{user && problemPage && <Timer />}
					{user && (
						<div className='cursor-pointer group relative'>
							<Image src='/avatar.png' alt='Avatar' width={30} height={30} className='rounded-full' />
							<div
								className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out'
							>
								<p className='text-sm'>{user.email}</p>
							</div>
						</div>
					)}
					{user && <Logout />}
				</div>
			</div>
		</nav>
	);
};
export default Topbar;
