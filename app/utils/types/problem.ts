export type Example = {
	id: number;
	inputText: string;
	outputText: string;
	explanation?: string;
	img?: string;
};

// local problem data
export type Problem = {
	id: number;
	title: string;
	titleSlug:string;
	difficulty:string;
	category:string;
	topics:string[];
	constaints:string;
	question:string;
	examples:{
		id:number;
		inputText:string;
		outputText:string;
		explanation:string;
	}[];
	tests:string;
	answer:string;
	code:string;
	videoId?:string;
	likes:number;
	dislikes:number;
};

export type DBProblem = {
	id: number;
	title: string;
	titleSlug:string;
	difficulty:string;
	category:string;
	topics:string[];
	constaints:string;
	question:string;
	examples:{
		id:number;
		inputText:string;
		outputText:string;
		explanation:string;
	}[];
	tests:string;
	answer:string;
	code:string;
	videoId?:string;
	likes:number;
	dislikes:number;
};
