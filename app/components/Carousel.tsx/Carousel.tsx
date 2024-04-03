import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Swipe from "react-easy-swipe";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function Carousel({
	images,
}: {
	images: { imgSrc: string; toHref: string }[];
}) {
	const [currentSlide, setCurrentSlide] = useState(0);

	const handleNextSlide = useCallback(() => {
		let newSlide =
			currentSlide === images.length - 1 ? 0 : currentSlide + 1;
		setCurrentSlide(newSlide);
	}, [currentSlide, images.length]);

	const handlePrevSlide = () => {
		let newSlide =
			currentSlide === 0 ? images.length - 1 : currentSlide - 1;
		setCurrentSlide(newSlide);
	};
	useEffect(() => {
		const intervalId = setInterval(handleNextSlide, 5000);

		return () => clearInterval(intervalId);
	}, [handleNextSlide]);

	return (
		<div className="flex justify-center mt-10 mb-16 ">
			<div className="relative flex justify-center items-center w-[900px] overflow-hidden">
				<AiOutlineLeft
					onClick={handlePrevSlide}
					className="text-3xl rounded-full w-8 mx-2 hover:bg-gray-400 hover:text-[#222831]  cursor-pointer text-gray-400 z-20"
				/>
				<div className="w-full">
					<Swipe
						onSwipeLeft={handleNextSlide}
						onSwipeRight={handlePrevSlide}
						className="cursor-pointer"
					>
						{images.map((image, index) => {
							if (index === currentSlide) {
								return (
									<Link
										href={image.toHref}
										target="_blank"
										key={index}
									>
										<Image
											src={image.imgSrc}
											height={1000}
											width={1000}
											alt="carousel image"
											// layout="fill"
											objectFit="contain"
											className="w-full h-[280px] p-1 "
										/>
									</Link>
								);
							}
						})}
					</Swipe>
				</div>
				<AiOutlineRight
					onClick={handleNextSlide}
					className="text-3xl rounded-full w-8 mx-2 hover:bg-gray-400 hover:text-[#222831]  cursor-pointer text-gray-400 z-20"
				/>
				<div className="absolute bottom-0 flex justify-center p-2">
					{images.map((_, index) => {
						return (
							<div
								className={
									index === currentSlide
										? "h-3 w-3 bg-gray-300 rounded-full mx-1 mb-1 cursor-pointer"
										: "h-3 w-3 bg-gray-700 rounded-full mx-1 mb-1 cursor-pointer"
								}
								key={index}
								onClick={() => {
									setCurrentSlide(index);
								}}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
