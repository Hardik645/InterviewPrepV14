import React from "react";
import { BsSearch } from "react-icons/bs";

interface props {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}
export const SearchBar = ({ inputValue, setInputValue }: props) => {
  return (
    <form
      className="flex bg-dark-layer-1 p-2 rounded-full justify-start items-center opacity-75 focus-within:opacity-100"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <BsSearch className="text-sm text-white mx-3" />
      <input
        type="search"
        placeholder="Search questions"
        className="bg-transparent text-lg width-full text-white focus:outline-none"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </form>
  );
};
