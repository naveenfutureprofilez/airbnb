import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import logologin from "../../public/images/Login_Logo.jpg";
import Image from "next/image";

import axios from "axios";
import { Context } from "../_app.js";
import Button from "../elements/Button.js";
import Listings from "../api/laravel/Listings.js";
import toast from "react-hot-toast";
const ReActive = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading == true) {
      return;
    }
    setLoading(true);
    const main = new Listings();
    const response = main.activateAccount({
      id: slug,
      status: 1,
    });
    response
      .then((res) => {
        if (res && res?.data && res?.data?.status) {
          toast.success(res?.data?.message);
          router.push("/login");
        } else {
          toast.error(res?.data?.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error?.message);
        toast.error(error?.response?.data);
        setLoading(false);
      });
  };
  return (
    <>
      <Head>
        <title>
          Quaint Spaces Jaipur
        </title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        {/* Logo */}
        <div className="mb-8">
          <img src={"https://quaintstays.laraveldevelopmentcompany.com/public/img/Logo1.png"} alt="Quaintspaces Jaipur logo" />
        </div>
        {/* Heading */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-center">
        Your account has been deactivated
        </h1>
        {/* Paragraph */}
        <p className="text-base sm:text-lg lg:text-xl text-center mb-8 max-w-md sm:max-w-lg">
        Please click on the below button to reactivate it
        </p>

        {/* Reactive Button */}
        <Button
          text={loading ? "Loading..." : "Reactivate"}
          design={
            "font-inter hover:bg-[#ffffff] uppercase border-[#efa3a3] border hover:text-[#efa3a3] font-normal leading-tight text-center text-white w-full sm:w-96 bg-[#efa3a3] sm:p-4 p-3 rounded-full"
          }
          
          onClick={handleSubmit}
        />
      </div>
    </>
  );
};

export default ReActive;

// export async function getServerSideProps(context) {
//   const { listingID } = context.query;
//   const main = new Listings();
//   const listingData = await main.PropertyDetail(listingID);
//   return {
//     props: {
//       listingData: listingData?.data?.data || null,
//       listingID,
//     },
//   };
// }