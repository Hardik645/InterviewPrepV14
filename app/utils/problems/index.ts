import { Problem } from "../types/problem";
import { BestTimetoBuyandSellStock } from "./best-time-to-buy-and-sell-stock";
import { containerWithMostWater } from "./container-with-most-water";
import { jumpGame } from "./jump-game";
import { maximumDepthOfBinaryTree } from "./maximum-depth-of-binary-tree";
import { mergeIntervals } from "./merge-intervals";
import { reverseLinkedList } from "./reverse-linked-list";
import { search2DMatrix } from "./search-a-2d-matrix";
import { twoSum } from "./two-sum";
import { validParentheses } from "./valid-parentheses";

interface ProblemMap {
	[key: string]: Problem;
}

export const problems: ProblemMap = {
	"two-sum": twoSum,
	"reverse-linked-list": reverseLinkedList,
	"jump-game": jumpGame,
	"search-a-2d-matrix": search2DMatrix,
	"valid-parentheses": validParentheses,
	"container-with-most-water": containerWithMostWater,
	"merge-intervals":mergeIntervals,
	"maximum-depth-of-binary-tree":maximumDepthOfBinaryTree,
	"best-time-to-buy-and-sell-stock":BestTimetoBuyandSellStock,
};
