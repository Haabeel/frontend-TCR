"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [prevUser, setPrevUser] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    pk: 0,
  });

  const handleSignOut = () => {
    axios.post("http://localhost:8000/auth/logout/", {
      Headers: {
        Authentication: `Token ${token}`,
      },
    });
    localStorage.setItem("token", "");
    localStorage.setItem("userData", "");
    setToken("");
    router.push("/");
  };

  const handleDelete = () => {
    const pk = userData.pk;
    axios
      .delete(`http://127.0.0.1:8000/api/user/${pk}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        localStorage.setItem("token", "");
        localStorage.setItem("userData", "");
        router.push("/");
      })
      .catch((error) => console.log(error.response));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setIsChanged(true);
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data;
    if (prevUser === userData.username) {
      const usernameToRemove = "username";
      data = Object.keys(userData).reduce<{
        [key: string]: string | number;
      }>((result, key) => {
        if (key !== usernameToRemove) {
          result[key] = userData[key as keyof typeof userData];
        }
        return result;
      }, {});
    } else {
      data = userData;
    }
    axios
      .patch("http://localhost:8000/auth/user/", data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else if (error.request) {
          toast.error(error.request, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error(error.message, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };

  useEffect(() => {
    setToken(localStorage.getItem("token") as string);
    if (localStorage.getItem("userData")) {
      const localStorageUserData = JSON.parse(
        localStorage.getItem("userData") as string,
      );
      setUserData(localStorageUserData);
      setPrevUser(localStorageUserData.username);
    } else {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-5 bg-darkBackground">
      <h1 className="text-5xl font-bold text-darkMainText">My Account</h1>
      <div className="flex flex-col items-center justify-center gap-6 rounded-md bg-darkNavbarBackground p-7">
        <h2 className="text-2xl font-bold text-darkParaText">
          Account details
        </h2>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3">
          {Object.keys(userData).map(
            (field: string) =>
              field !== "pk" && (
                <div
                  className="flex w-[25vw] items-center justify-end gap-3"
                  key={field}
                >
                  <label
                    htmlFor={field}
                    className="w-1/3 text-lg text-darkMainText"
                  >
                    {field in ["username, email"]
                      ? field.charAt(0).toUpperCase() + field.slice(1)
                      : field.replace(/_/g, " ").charAt(0).toUpperCase() +
                        field.replace(/_/g, " ").slice(1)}
                  </label>
                  <input
                    id={field}
                    type="text"
                    value={userData[field as keyof typeof userData]}
                    name={field}
                    placeholder={
                      field in ["username", "email"]
                        ? field
                        : field.replace(/_/g, " ")
                    }
                    onChange={(e) => handleChange(e)}
                    className={`h-10 w-2/3 rounded-md bg-darkSecondary p-2 text-darkAccent transition duration-300 ease-in-out placeholder:text-darkPrimary focus:outline-none placeholder:focus:text-transparent mobile:h-8 mobile:w-2/3 ${
                      field === "username" ? "lowercase" : ""
                    }`}
                  />
                </div>
              ),
          )}
          <button
            type="submit"
            disabled={!isChanged}
            className={` bg-darkSecondary text-darkPrimary ${
              isChanged
                ? "cursor-auto hover:bg-darkPrimary hover:text-darkSecondary"
                : "cursor-not-allowed"
            } rounded-md px-4 py-2 text-lg font-semibold transition duration-300 ease-in-out`}
          >
            Save changes
          </button>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleSignOut}
              className={` w-1/2 rounded-md bg-darkSecondary px-4 py-2 text-lg font-semibold text-darkPrimary transition duration-300 ease-in-out hover:bg-darkPrimary hover:text-darkSecondary
            `}
            >
              Sign out
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className={`hover:text-darkMainTextrounded-md w-1/2 bg-darkSecondary px-4 py-2 text-lg font-semibold text-darkPrimary transition duration-300 ease-in-out hover:bg-red-900
            `}
            >
              Delete
            </button>
          </div>
          <div>
            <button
              onClick={() => router.push("/")}
              className={`w-full rounded-md bg-darkSecondary px-4 py-2 text-lg font-semibold text-darkPrimary transition duration-300 ease-in-out hover:bg-darkPrimary hover:text-darkSecondary
            `}
            >
              Home
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Account;
