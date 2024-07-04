import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/Logo.jpeg";
import LocalToken from "../../hooks/LocalToken";
import { useRouter } from "next/router";
import { Context } from "../_app";
import { toast } from 'react-hot-toast';
import Menu from "./Menu";
import Listings from "../api/laravel/Listings";
import { IoMdMenu } from "react-icons/io";

export default function Header() {
  const router = useRouter();
  const auth = useContext(Context);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { setAuth } = useContext(Context);
  const webtoken = LocalToken('token');
  
  async function getAuth(s) { 
    if (webtoken) {
      const main = new Listings();
      const response = main.GetUserProfile(s);
      response.then((res) => {
        if (res?.data?.status) {
          setAuth(res?.data?.data);
        } 
      }).catch((error) => {
        console.log("error", error);
      });
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAuth(signal);
    return () => controller.abort();
  }, []);

  return (
    <nav className="navbar">
      <div className="container flex items-center justify-between">
        <div className="logo">
          <Link href="/"> 
            <Image src={logo} alt="QS Jaipur Logo" />
          </Link>
        </div>
        <div className="nav-bar flex items-center">
          <div className="menu-icon" onClick={toggleMenu}>
           <IoMdMenu/>
          </div>
          <div className={`menu-items flex-col md:flex-row md:flex md:gap-8 items-center ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
            <Link href="/apartments" className="border-b md:border-0">
              <p>Our Apartments</p>
            </Link>
            <Link href="/#testimonials" className="border-b md:border-0">
              <p>Place in Jaipur</p>
            </Link>
            {/* <Link href="/contact">
              <p>Contact</p>
            </Link> */}
            {auth?.auth?.email ? (
              <div className="profile-image relative" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <div className="profile-image-container items-center" style={{ cursor: 'pointer' }}>
                  <Image
                    src={auth?.auth?.image_url ? auth?.auth?.image_url : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                    alt="profile"
                    width={100}
                    height={100}
                  />
                  <span className="ml-[5px]">{auth?.auth?.first_name}</span>
                </div>
                {isDropdownOpen && <Menu />}
              </div>
            ) : (
              <div className="login-signup-btn flex mt-2 md:mt-0">
                <Link className="login" href="/login">
                  <p>Login</p>
                </Link>
                <Link className="signup" href="/signup">
                  <p className="text-white">Sign Up</p>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
