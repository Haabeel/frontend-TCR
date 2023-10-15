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

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const Router = useRouter();

  const handleRegister = (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    console.log("axios");
    console.log({
      email: email,
      username: username,
      password1: password,
      password2: confirmPassword,
    });
    axios
      .post("http://127.0.0.1:8000/auth/registration/", {
        email: email,
        username: username,
        password1: password,
        password2: confirmPassword,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.key);
        Router.push("/login");
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          toast.error(error.response.data.username[0], {
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
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-darkBackground">
      <h1
        className={`${mainTitleFont.className} m-0 h-min select-none p-0 text-8xl text-darkPrimary`}
      >
        Savoury Search
      </h1>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-center text-5xl font-bold text-darkAccent">
          Sign up
        </h1>
        <form className="mt-6" onSubmit={handleRegister} autoComplete="off">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-md block font-semibold text-darkPrimary"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 block w-full rounded-md border bg-transparent px-4 py-2 text-darkParaText focus:outline-none placeholder:focus:text-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-2">
            <label
              htmlFor="confirmPassword"
              className="text-md block font-semibold text-darkPrimary"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className=" mt-2 block w-full rounded-md border bg-transparent px-4 py-2 text-darkParaText focus:outline-none placeholder:focus:text-transparent"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Link
            href="/login"
            className="text-xs text-darkPrimary hover:underline"
          >
            {`Already have an account? Login here.`}
          </Link>
          <div className="mt-2">
            <button
              type="submit"
              className="w-full transform rounded-md bg-darkSecondary px-4 py-2 tracking-wide text-darkPrimary focus:outline-none"
            >
              Sign up
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

export default Signup;
