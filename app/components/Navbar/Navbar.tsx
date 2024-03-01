"use client";
import { useNavContext } from "@/app/context/NavContext";
import Link from "next/link";
type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
	const {setAuthModalState} = useNavContext();
	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, isOpen: true }));
	};
	return (
		<div className='flex items-center justify-between sm:px-12 px-2 md:px-24'>
			<Link href='/' className='flex items-center justify-center h-20'>
				<h1 className="text-3xl font-bold text-white/90 hover:text-white">&#x2770; Interview Prep /&#x2771;</h1>
			</Link>
			<div className='flex items-center'>
				<button
					className='bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
                hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange border-2 border-transparent
                transition duration-300 ease-in-out'
					onClick={handleClick}
				>
					Sign In
				</button>
			</div>
		</div>
	);
};
export default Navbar;
