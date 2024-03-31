import React from "react";
import Select from "react-select";

export const CategorySelect = ({
  category,
  setCategory,
}: {
  category: string[];
  setCategory: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const options = [
    { value: "Array", label: "Array" },
    { value: "Backtracking", label: "Backtracking" },
    { value: "Binary Indexed Tree", label: "Binary Indexed Tree" },
    { value: "Binary Search", label: "Binary Search" },
    { value: "Binary Search Tree", label: "Binary Search Tree" },
    { value: "Binary Tree", label: "Binary Tree" },
    { value: "Bit Manipulation", label: "Bit Manipulation" },
    { value: "Bitmask", label: "Bitmask" },
    { value: "Brainteaser", label: "Brainteaser" },
    { value: "Breadth-First Search", label: "Breadth-First Search" },
    { value: "Bucket Sort", label: "Bucket Sort" },
    { value: "Combinatorics", label: "Combinatorics" },
    { value: "Counting", label: "Counting" },
    { value: "Counting Sort", label: "Counting Sort" },
    { value: "Data Stream", label: "Data Stream" },
    { value: "Depth-First Search", label: "Depth-First Search" },
    { value: "Design", label: "Design" },
    { value: "Divide and Conquer", label: "Divide and Conquer" },
    { value: "Doubly-Linked List", label: "Doubly-Linked List" },
    { value: "Dynamic Programming", label: "Dynamic Programming" },
    { value: "Enumeration", label: "Enumeration" },
    { value: "Eulerian Circuit", label: "Eulerian Circuit" },
    { value: "Game Theory", label: "Game Theory" },
    { value: "Geometry", label: "Geometry" },
    { value: "Graph", label: "Graph" },
    { value: "Greedy", label: "Greedy" },
    { value: "Hash Function", label: "Hash Function" },
    { value: "Hash Table", label: "Hash Table" },
    { value: "Heap (Priority Queue)", label: "Heap (Priority Queue)" },
    { value: "Interactive", label: "Interactive" },
    { value: "Iterator", label: "Iterator" },
    { value: "Line Sweep", label: "Line Sweep" },
    { value: "Linked List", label: "Linked List" },
    { value: "Math", label: "Math" },
    { value: "Matrix", label: "Matrix" },
    { value: "Memoization", label: "Memoization" },
    { value: "Merge Sort", label: "Merge Sort" },
    { value: "Monotonic Queue", label: "Monotonic Queue" },
    { value: "Monotonic Stack", label: "Monotonic Stack" },
    { value: "Number Theory", label: "Number Theory" },
    { value: "Ordered Set", label: "Ordered Set" },
    { value: "Prefix Sum", label: "Prefix Sum" },
    { value: "Queue", label: "Queue" },
    { value: "Quickselect", label: "Quickselect" },
    { value: "Radix Sort", label: "Radix Sort" },
    { value: "Randomized", label: "Randomized" },
    { value: "Recursion", label: "Recursion" },
    { value: "Rejection Sampling", label: "Rejection Sampling" },
    { value: "Reservoir Sampling", label: "Reservoir Sampling" },
    { value: "Rolling Hash", label: "Rolling Hash" },
    { value: "Segment Tree", label: "Segment Tree" },
    { value: "Shortest Path", label: "Shortest Path" },
    { value: "Simulation", label: "Simulation" },
    { value: "Sliding Window", label: "Sliding Window" },
    { value: "Sorting", label: "Sorting" },
    { value: "Stack", label: "Stack" },
    { value: "String", label: "String" },
    { value: "String Matching", label: "String Matching" },
    { value: "Topological Sort", label: "Topological Sort" },
    { value: "Tree", label: "Tree" },
    { value: "Trie", label: "Trie" },
    { value: "Two Pointers", label: "Two Pointers" },
    { value: "Union Find", label: "Union Find" },
  ]; // [Array, Backtracking
  const handleChange = (selectedOption: any) => {
    setCategory(selectedOption.map((option: any) => option.value));
  };

  return (
    <div>
      <Select
        isMulti
        options={options}
        value={
          category.length
            ? category.map((cat) => ({ value: cat, label: cat }))
            : []
        }
        onChange={handleChange}
        placeholder="Select categories"
        styles={{
          control: (provided) => ({
            ...provided,
            border: "0px",
            opacity: 0.75,
            borderRadius: "9999px",
            padding: "4px",
            backgroundColor: "rgb(57 62 70 / var(--tw-bg-opacity))",
            ":focus-within": {
              opacity: 1,
            },
          }),
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: "#505762",
            borderRadius: "9999px",
            padding: "2px 5px",
          }),
          input: (provided) => ({
            ...provided,
            color: "white",
            fontSize: "14px",
          }),
          placeholder: (provided) => ({
            ...provided,
            fontSize: "18px",
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            color: "white",
            ":hover": {
              opacity: 0.6,
            },
          }),
          clearIndicator: (provided) => ({
            ...provided,
            color: "white",
            ":hover": {
              opacity: 0.6,
            },
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            color: "white",
          }),
          multiValueRemove: (provided) => ({
            ...provided,
            color: "white",
            borderRadius: "9999px",
            margin: "1px",
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: "#393e46",
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#505762" : "#393e46",
            color: state.isSelected ? "white" : "white",
            ":hover": {
              backgroundColor: "#505762",
            },
          }),
        }}
      />
    </div>
  );
};
