import assert from "assert";
import { Problem } from "../types/problem";

export const maximumDepthOfBinaryTreeHandler = (fn: any) => {
	try {
		const tests = [
			[3,9,20,null,null,15,7],
			[1,null,2],
		];
		const answers = [3,2];
		for (let i = 0; i < tests.length; i++) {
			const result = fn(tests[i]);
			assert.equal(result, answers[i]);
		}
		return true;
	} catch (error: any) {
		console.log("Error from maximumDepthOfBinaryTreeHandler: ", error);
		throw new Error(error);
	}
};

const starterCodeMaximumDepthOfBinaryTreeJS = `/**
* Definition for a binary tree node.
* class TreeNode {
*     val: number
*     left: TreeNode | null
*     right: TreeNode | null
*     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
*         this.val = (val===undefined ? 0 : val)
*         this.left = (left===undefined ? null : left)
*         this.right = (right===undefined ? null : right)
*     }
* }
*/

function maxDepth(root) {
  // Write your code here
};`;

export const maximumDepthOfBinaryTree: Problem = {
	id: "maximum-depth-of-binary-tree",
	title: "8. Maximum Depth of Binary Tree",
	problemStatement: `<p class='mt-3'>
    Given the <code>root</code> of a binary tree, return its maximum depth.
	</p>
	<p class='mt-3'>
	A binary tree's <strong>maximum depth</strong> is the number of nodes along the longest path from the root node down to the farthest leaf node.
	</p>
	`,

	examples: [
		{
			id: 0,
			inputText: `root = [3,9,20,null,null,15,7]`,
			outputText: `3`,
		},
		{
			id: 1,
			inputText: `root = [1,null,2]`,
			outputText: `2`,
		},
	],
	constraints:`<li class='mt-2'>The number of nodes in the tree is in the range <code>[0, 104]</code>.</li>
                <li class='mt-2'><code>-100 <= Node.val <= 100</code></li>`,
	starterCode: starterCodeMaximumDepthOfBinaryTreeJS,
	handlerFunction: maximumDepthOfBinaryTreeHandler,
	starterFunctionName: "function maxDepth(",
	order: 8,
};
