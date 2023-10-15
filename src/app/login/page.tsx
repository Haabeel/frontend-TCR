"use client";
import { Great_Vibes as GreatVibes } from "next/font/google";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mainTitleFont = GreatVibes({
  weight: "400",
  subsets: ["latin"],
});
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Router = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/auth/login/", {
        username: username,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.key);
        Router.push("/");
      })
      .catch((error) => {
        if (error.response) {
          error.response.status === 400
            ? toast.error("Incorrect username or password", {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              })
            : toast.error(error.response.non_field_errors[0], {
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
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-darkBackground text-darkPrimary">
      <h1
        className={`${mainTitleFont.className} fixed top-10 m-0 h-min select-none p-0 text-8xl text-darkPrimary`}
      >
        Savoury Search
      </h1>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-center text-5xl font-bold text-darkAccent">
          Login
        </h1>
        <form className="mt-6" onSubmit={handleLogin} autoComplete="off">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="text-md block font-semibold text-darkPrimary"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-2 block w-full rounded-md border bg-transparent px-4 py-2 text-darkParaText focus:outline-none placeholder:focus:text-transparent"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="text-md block font-semibold text-darkPrimary"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className=" mt-2 block w-full rounded-md border bg-transparent px-4 py-2 text-darkParaText focus:outline-none placeholder:focus:text-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Link
            href="/signup"
            className="text-xs text-darkPrimary hover:underline"
          >
            {`Don't have an account? Sign up here.`}
          </Link>
          <div className="mt-2">
            <button
              type="submit"
              className="w-full transform rounded-md bg-darkSecondary px-4 py-2 tracking-wide text-darkPrimary focus:outline-none"
            >
              Login
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

export default Login;
