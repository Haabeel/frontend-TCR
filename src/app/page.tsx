"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import FeedContainer from "./components/FeedContainer/FeedContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DishType, IngredientType, MergedData } from "@/types";
export default function Home() {
  const [token, setToken] = useState("");
  const [data, setData] = useState<MergedData[] | undefined>();
  const [userData, setUserData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    pk: 0,
    username: "",
  });
  const [image, setImage] = useState();
  async function getStaticProps() {
    try {
      const response = await fetch("http://localhost:8000/api/dishes/");
      const imageResponse = await fetch(
        "http://localhost:8000/api/dishes/images/",
      );
      if (token !== "") {
        const UserResponse = await fetch("http://localhost:8000/auth/user/", {
          method: "get",
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const userDataJSON = await UserResponse.json();
        setUserData(userDataJSON);
        localStorage.setItem("userData", JSON.stringify(userDataJSON));
      }
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const imgData = await imageResponse.json();
      setData(data);
      setImage(imgData);
    } catch (error) {
      toast.error("Something went wrong...", {
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
  }
  useEffect(() => {
    getStaticProps();
    setToken(localStorage.getItem("token") as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <div
        className={`flex h-screen w-screen flex-col overflow-hidden 
           bg-darkBackground`}
      >
        <Navbar
          setToken={setToken}
          token={token}
          userData={userData}
          dishes={data as MergedData[]}
        />
        <FeedContainer data={data} imgData={image} />
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
    </>
  );
}
