import assert from "assert";
import { Problem } from "../types/problem";

export const bestTimetoBuyandSellStockHandler = (fn: any) => {
	try {
		const tests = [
			[7,1,5,3,6,4],
			[7,6,4,3,1],
		];
		const answers = [5,0];
		for (let i = 0; i < tests.length; i++) {
			const result = fn(tests[i]);
			assert.equal(result, answers[i]);
		}
		return true;
	} catch (error: any) {
		console.log("Error from bestTimetoBuyandSellStockHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeBestTimetoBuyandSellStockJS = `function maxProfit(prices) {
  // Write your code here
};`;

export const BestTimetoBuyandSellStock: Problem = {
	id: "best-time-to-buy-and-sell-stock",
	title: "9. Best Time to Buy and Sell Stock",
	problemStatement: `<p class='mt-3'>
    You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the ith day.
	</p>
    <p class='mt-3'>
    You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
    </p>
	<p class='mt-3'>
	Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return <code>0</code>.
	</p>
	`,

	examples: [
		{
			id: 0,
			inputText: `prices = [7,1,5,3,6,4]`,
			outputText: `5`,
			explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.\nNote that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.",
		},
		{
			id: 1,
			inputText: `prices = [7,6,4,3,1]`,
			outputText: `0`,
			explanation: "In this case, no transactions are done and the max profit = 0.",
		},
	],
	constraints:`<li class='mt-2'><code>1 <= prices.length <= 105</code></li>
                <li class='mt-2'><code>0 <= prices[i] <= 104</code></li>`,
	starterCode: starterCodeBestTimetoBuyandSellStockJS,
	handlerFunction: bestTimetoBuyandSellStockHandler,
	starterFunctionName: "function maxProfit(",
	order: 9,
};
