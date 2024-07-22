import { useState } from "react";
import { Movie } from "../services/movies";

export type SearchBoxProps = {
  placeholder: string;
  handleSearch: (searchText: string) => void;
}

export default function SearchBox(props: SearchBoxProps) {
  const { handleSearch, placeholder } = props;

  const [searchText, setSearchText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(searchText);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex w-full">
      <input
        type="text"
        value={searchText}
        onChange={handleChange}
        placeholder={placeholder}
        className="rounded-md px-3 py-2 w-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
      />
      <button type="submit" className="ml-2 py-2 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Search
      </button>
    </form>
  );
}
