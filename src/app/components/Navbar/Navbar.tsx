import { Great_Vibes as GreatVibes } from "next/font/google";
import SearchBar from "./SearchBar";
import DarkModeToggle from "./DarkModeToggle";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { MergedData, UserData } from "@/types";

const mainTitleFont = GreatVibes({
  weight: "400",
  subsets: ["latin"],
});
const Navbar = ({
  dishes,
  setToken,
  token,
  userData,
}: {
  dishes: MergedData[];
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  userData: UserData;
}) => {
  return (
    <nav
      className={`flex items-center justify-between bg-darkNavbarBackground p-2 `}
    >
      <h1
        className={`${mainTitleFont.className} m-0 h-min select-none p-0 text-6xl text-darkPrimary`}
      >
        Savoury Search
      </h1>
      <div className="flex items-center justify-center gap-2">
        <SearchBar dishes={dishes} />
        {token && (
          <Link
            href={"/create"}
            className={`flex h-10 
              w-20 items-center
              justify-center rounded-md bg-darkSecondary text-xl text-darkAccent transition-transform duration-200 hover:scale-105`}
          >
            Post
          </Link>
        )}
      </div>
      <div className="flex h-[20vh] items-center justify-center gap-5 self-auto">
        {token === "" || !token ? (
          ["Login", "Sign up"].map((btn) => {
            return (
              <Link
                href={`/${btn.toLowerCase().replace(/\s/g, "")}`}
                key={btn}
                className={` rounded-md bg-darkSecondary px-4 py-2 text-lg font-semibold text-darkPrimary transition duration-300 ease-in-out hover:bg-darkPrimary hover:text-darkSecondary
                `}
              >
                {btn}
              </Link>
            );
          })
        ) : (
          <div className="flex select-none items-center justify-center gap-3">
            <p className="text-lg text-darkAccent">@{userData.username}</p>
            <Link
              href={"/account"}
              className={`z-10 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-darkSecondary text-3xl text-darkMainText`}
            >
              {userData.first_name === ""
                ? userData.username.slice(0, 1).toUpperCase()
                : userData.first_name.slice(0, 1).toUpperCase() +
                  userData.last_name.slice(0, 1).toUpperCase()}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
