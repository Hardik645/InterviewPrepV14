"use client"
import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";
import AuthModal from "../components/Modals/AuthModal";
import { useNavContext } from "../context/NavContext";

function AuthPage() {
	const {authModalState}=useNavContext()
	return (
		<div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
			<div className='max-w-7xl mx-auto'>
				<Navbar />
				<div className='flex flex-col items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
					<Image src='/hero2.jpg' alt='Hero img' width={700} height={700}  className="p-10"/>
					<div className="flex flex-col text-center text-white font-bold">
						<h1 className="text-4xl py-2">Build your skills not your resume</h1>
						<h2 className="text-2xl py-2">-Sheryl Sandberg</h2>
					</div>
				</div>
				{authModalState.isOpen && <AuthModal />}
			</div>
		</div>
	);
};
export default AuthPage;
