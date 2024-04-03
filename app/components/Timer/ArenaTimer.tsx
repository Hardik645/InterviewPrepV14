import React, { useEffect, useState } from "react";

const ArenaTimer = () => {
	const getNextArena = () => {
		const now = new Date();
		const daysUntilNextWednesday = (3 - now.getDay() + 7) % 7;
		const nextWednesday = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate() + daysUntilNextWednesday
		);
		nextWednesday.setHours(20, 0, 0, 0); // Set the time to 8:30 PM
		return nextWednesday;
	};
	const [nextWednesday, setNextWednesday] = useState(getNextArena());
	const calculateRemainingTime = () => {
		const remainingTime = nextWednesday.getTime() - Date.now();
		const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
		const remainingMinutes = Math.floor(
			(remainingTime % (1000 * 60 * 60)) / (1000 * 60)
		);
		const remainingSeconds = Math.floor(
			(remainingTime % (1000 * 60)) / 1000
		);
		return {
			hours: remainingHours,
			minutes: remainingMinutes,
			seconds: remainingSeconds,
		};
	};
	const [remainingTime, setRemainingTime] = useState(
		calculateRemainingTime()
	);
	const [isLive, setIsLive] = useState(false);
	useEffect(() => {
		const interval = setInterval(() => {
			setRemainingTime(calculateRemainingTime());
		}, 1000);
		if (
			remainingTime.hours < 0 ||
			remainingTime.minutes < 0 ||
			remainingTime.seconds < 0
		) {
			setNextWednesday(getNextArena());
			setIsLive(true);
		}
		if (remainingTime.hours < -5) {
			setNextWednesday(getNextArena());
			setIsLive(false);
		}
		return () => clearInterval(interval);
	}, []);
	const formatNextWednesday = (date: Date) => {
		const options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		};
		return date.toLocaleString("en-US", options as any);
	};

	const formattedNextWednesday = formatNextWednesday(nextWednesday);
	const remainingTimeString = `${remainingTime.hours} hrs ${remainingTime.minutes} mins ${remainingTime.seconds} sec`; // Example usage
	return (
		<>
			{isLive ? (
				<h1 className="text-2xl text-center text-red-500">Live Now!</h1>
			) : (
				<>
					<h1
						className="text-2xl text-center text-gray-700 dark:text-gray-300 font-medium
            uppercase mt-10 mb-5"
					>
						<p className="text-3xl font-bold">Next Arena⏰:</p>
						<p className="p-2">{formattedNextWednesday}</p>
					</h1>
					<h1
						className="text-2xl text-center text-gray-700 dark:text-gray-300 font-medium
            uppercase mt-10 mb-5"
					>
						<p className="text-3xl font-bold">Remaining Time⏳:</p>
						<p className="p-2">{remainingTimeString}</p>
					</h1>
				</>
			)}
		</>
	);
};

export default ArenaTimer;
