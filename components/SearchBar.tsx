"use client";

import { SearchBarProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = ({ openSearch, setOpenSearch }: SearchBarProps) => {
  const router = useRouter();

  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/list?name=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      className={`bg-brand flex items-center gap-2 rounded-md transition-all duration-300 ${
        openSearch ? "w-full px-3" : "w-10 p-2"
      }`}
      onSubmit={handleSearch}
    >
      <button
        type="button"
        onClick={() => setOpenSearch(true)}
        className="cursor-pointer"
      >
        <Image
          src="/icon-search.png"
          alt="search icon"
          width={19}
          height={19}
        />
      </button>

      {openSearch && (
        <input
          type="text"
          name="name"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="flex-1 bg-transparent text-white placeholder-gray-200 outline-none"
        />
      )}
    </form>
  );
};

export default SearchBar;
