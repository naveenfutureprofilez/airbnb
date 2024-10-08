import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Listing from "../api/Listing";
import { useContext } from 'react';
import { Context } from "../../_app";
import Head from 'next/head';
import Link from "next/link";

export default function Login() {
  const { setAuth } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleInputs = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setRecord((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const main = new Listing();
    const formData = new FormData();
    formData.append("email", record.email);
    formData.append("password", record.password);
    const response = main.adminlogin(formData);
    response
      .then((res) => {
        if (res && res?.data && res?.data?.status) {
          setAuth(res?.data?.data);
          toast.success(res.data.message);
          localStorage && localStorage.setItem("Admintoken", res?.data?.token);
          router.push("/admin");
          setLoading(false);
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
        setRecord({
          email: "",
          password: "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>QS Admin Login </title>
        <meta name="description" content="Quant Stay Admin Login " key="Quant Stay Admin " />
        <meta property="og:title" content="Quant Stay Admin Login " />
        <meta
          property="og:description"
          content="Quant Stay  Admin Login"
        />
        <meta
          property="og:image"
          content="https://example.com/images/cool-page.jpg"
        />
      </Head>
      <div className="bg-no-repeat mainadmin bg-cover bg-center relative object-cover min-h-screen flex items-center justify-center"
        style={{ backgroundImage: `url(/images/banner/login_img.JPG)` }}
      >
        <div className="flex justify-center self-center z-10 px-4">
          <div className="p-12 bg-white mx-auto rounded-2xl w-full max-w-md">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-black-800">Sign In </h3>
              <p className="text-black-500">Please sign in to your account.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">Email</label>
                  <input className="mt-1 p-4 border rounded-full w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type="email"
                    name="email"
                    value={record.email}
                    onChange={handleInputs}
                    id="email"
                    placeholder="your@email.com"
                    required />
                </div>
                <div className="space-y-2">
                  <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Password
                  </label>
                  <input className="mt-1 p-4 border rounded-full w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type="password"
                    name="password"
                    value={record.password}
                    onChange={handleInputs}
                    id="password"
                    placeholder="Enter your password"
                    required />
                </div>
                <div className="flex items-center justify-between mb-5">
                  <div className="text-sm">
                    <Link href="/admin/forget-password" className="text-black text-l hover:text-indigo-500">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <button type="submit" className="w-full flex justify-center bg-[#efa3a3] border-2 border-[#efa3a3] text-[#fff] p-3 mt-4 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500">
                  {loading ? "Please wait..." : "Sign in"}
                </button>
              </div>
            </form>
            <div className="pt-5 text-center text-black-400 text-xs">
            &copy; Quaint Spaces Jaipur, 2024
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
