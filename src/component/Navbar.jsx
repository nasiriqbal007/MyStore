import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { MapPinIcon } from "lucide-react";
import { CgClose } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import ResponsiveMenu from "./ResponsiveMenu";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const NavBar = ({
  userLocation,
  getLocation,
  isDropdownOpen,
  setIsDropdownOpen,
}) => {
  const [openNav, setOpenNav] = useState(false);
  const { cartItem } = useCart();

  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const activeClass =
    "border-b-4 border-red-600 transition-all duration-300 inline-block-0.5";

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-white py-3 shadow-2xl px-4 md:px-0">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo + Location */}
        <div className="flex items-center gap-7">
          <Link to="/" className="font-bold text-3xl">
            My<span className="text-red-600 font-serif">S</span>tore
          </Link>

          {/* Location */}
          <div
            className="md:flex gap-1 cursor-pointer text-gray-700 items-center hidden"
            onClick={toggleDropdown}
          >
            <MapPinIcon className="text-red-500" />
            <span className="font-semibold">
              {userLocation ? (
                <div className="-space-y-2">
                  <p>{userLocation.country}</p>
                  <p>{userLocation.state}</p>
                </div>
              ) : (
                "Add Address"
              )}
            </span>
            <FaCaretDown />
          </div>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md">
              <h1 className="font-semibold mb-4 text-xl flex justify-between">
                Change Location{" "}
                <span onClick={toggleDropdown}>
                  <CgClose />
                </span>
              </h1>
              <button
                onClick={getLocation}
                className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400 w-full"
              >
                Detect my location
              </button>
            </div>
          )}
        </div>

        {/* Menu + Cart + Auth */}
        <nav className="flex gap-7 items-center">
          <ul className="md:flex gap-7 items-center text-xl font-semibold hidden">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "border-b-3 transition-all border-red-500"
                    : "text-black cursor-pointer"
                }
              >
                <li>{link.name}</li>
              </NavLink>
            ))}
          </ul>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <IoMdCart className="h-7 w-7" />
            <span className="bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white">
              {cartItem.length}
            </span>
          </Link>

          {/* Auth */}
          <div className="hidden md:block">
            <SignedOut>
              <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile toggle */}
          {openNav ? (
            <HiMenuAlt3
              onClick={() => setOpenNav(false)}
              className="h-7 w-7 md:hidden"
            />
          ) : (
            <HiMenuAlt1
              onClick={() => setOpenNav(true)}
              className="h-7 w-7 md:hidden"
            />
          )}
        </nav>
      </div>

      {/* Responsive Menu */}
      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} links={links} />
    </div>
  );
};

export default NavBar;
