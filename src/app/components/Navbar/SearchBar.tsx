"use client";

import { MergedData } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchBar = ({ dishes }: { dishes: MergedData[] }) => {
  const [activeSearch, setActiveSearch] = useState(dishes);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      router.push(`/?q=${encodeURIComponent(searchQuery)}`);
    }, 500);

    return () => clearTimeout(delayTimer);
  }, [searchQuery, router]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value;

    setSearchQuery(newSearchQuery);

    setActiveSearch(
      dishes
        .filter((dish) =>
          dish.name.toLowerCase().includes(newSearchQuery.toLowerCase()),
        )
        .slice(0, 8),
    );
  };

  return (
    <form className="flex items-center justify-center self-auto mobile:self-auto">
      <input
        onChange={(e) => handleSearch(e)}
        type="text"
        name="search"
        placeholder="Search"
        className={`h-10 w-[50vw] rounded-md bg-darkSecondary p-2 font-bold tracking-wide text-darkAccent placeholder:text-darkPrimary focus:outline-none placeholder:focus:text-transparent`}
      />
    </form>
  );
};

export default SearchBar;
