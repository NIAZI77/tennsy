// Import the handleSearch function
import React, { useState, useEffect, useRef } from "react";
import { FaCartArrowDown, FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const [sidebarToggler, setSidebarToggler] = useState(false);
  const [searchbarToggler, setSearchbarToggler] = useState(false);
  const [navbarToggler, setNavbarToggler] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const navbarRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim() !== "") {
      router.push(`/search?s=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e); // Call handleSearch when Enter key is pressed
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setSidebarToggler(false);
        setSearchbarToggler(false);
        setNavbarToggler(false);
      }
    };

    const handleRouteChange = () => {
      setSidebarToggler(false);
      setSearchbarToggler(false);
      setNavbarToggler(false);
    };

    document.addEventListener("click", handleClickOutside);
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <div ref={navbarRef} className="fixed top-0 w-screen bg-white z-50 md:h-[70px]">
      <nav className="border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2 px-4">
          <Link
            title="Tennsy"
            href="/"
            className="flex items-center justify-center"
          >
            <img
              width={32}
              height={32}
              src="/logo.svg"
              className=""
              alt="Logo"
            />
            <div className="font-bold text-lg">TENNSY</div>
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button aria-label="Search" className="h-8 w-8">
              <FaSearch
                className="h-6 w-6"
                onClick={() => {
                  setSearchbarToggler(!searchbarToggler);
                }}
              />
            </button>
            <button aria-label="Cart" className="h-8 w-8">
              <Link title="Tennsy" href={"/cart"}>
                <FaCartArrowDown
                  className="h-6 w-6"
                  onClick={() => {
                    setSidebarToggler(!sidebarToggler);
                  }}
                />{" "}
              </Link>
            </button>
            <button aria-label="Menu" className="h-8 w-8">
              <GiHamburgerMenu
                className="h-6 w-6 block md:hidden"
                onClick={() => {
                  setNavbarToggler(!navbarToggler);
                }}
              />
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              navbarToggler ? "flex" : "hidden"
            }`}
            id="navbar-user"
          >
            <ul className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 border-t border-gray-200 md:p-4 md:rounded-lg font-semibold">
              <li>
                <Link
                  title="Tennsy"
                  href="/"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  title="Tennsy"
                  href="/t-shirts"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  T-shirts
                </Link>
              </li>
              <li>
                <Link
                  title="Tennsy"
                  href="/hoodies"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  Hoodies
                </Link>
              </li>
              <li>
                <Link
                  title="Tennsy"
                  href="/caps"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  Caps
                </Link>
              </li>
              <li className="bg-[#DBE9F4] px-8 text-red-500 py-1">
                <Link
                  title="Tennsy"
                  href="/sales"
                  className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  Sales
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {searchbarToggler && (
        <div className="absolute right-5 ">
          <input
            type="text"
            name="search"
            className="px-2 py-1 border-2 border-slate-100 outline-none"
            placeholder="Search"
            id="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
