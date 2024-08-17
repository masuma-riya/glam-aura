import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useAuth();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    logOut()
      .then((result) => {
        // console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <header className="shadow-md font-[sans-serif] tracking-wide relative z-50">
      <section className="md:flex lg:items-center relative py-3 lg:px-10 px-4 border-gray-200 border-b bg-white lg:min-h-[80px] max-lg:min-h-[60px]">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShWBDlVEyg_cjsDHxvC5Jqv217jE0wAhCzAJxnJTLPc72bDnMbemc0RlD7-Nkwk3BRjms&usqp=CAU"
          alt="logo"
          className="w-[80px]"
        />

        <div className="flex flex-wrap w-full items-center">
          {/* <input
            type="text"
            placeholder="Search something..."
            className="xl:w-96 max-lg:w-full lg:ml-10 max-md:mt-4 max-lg:ml-4 bg-gray-100 focus:bg-transparent px-6 rounded h-11 outline-[#333] text-sm transition-all"
          /> */}
          <div className="ml-auto max-lg:mt-4">
            <ul className="flex items-center">
              {/* Additional menu items can be added here */}{" "}
              <Link to="/products">
                {" "}
                <li className="max-sm:hidden flex text-[15px] max-lg:py-2 px-3 font-extrabold text-red-700 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    className="mr-2"
                    viewBox="0 0 24 24"
                  >
                    <g data-name="Layer 2">
                      <path
                        d="M14.5 12.75A3.22 3.22 0 0 1 12 11.6a3.27 3.27 0 0 1-2.5 1.15A3.22 3.22 0 0 1 7 11.6a2.91 2.91 0 0 1-.3.31 3.22 3.22 0 0 1-2.51.82 3.35 3.35 0 0 1-2.94-3.37v-.71a4.76 4.76 0 0 1 .24-1.5l1.57-4.7a1.75 1.75 0 0 1 1.66-1.2h14.56a1.75 1.75 0 0 1 1.66 1.2l1.57 4.7a4.76 4.76 0 0 1 .24 1.5v.71a3.35 3.35 0 0 1-2.92 3.37 3.2 3.2 0 0 1-2.51-.82c-.11-.1-.22-.22-.32-.33a3.28 3.28 0 0 1-2.5 1.17zm-9.78-10a.26.26 0 0 0-.24.17l-1.56 4.7a3.27 3.27 0 0 0-.17 1v.71a1.84 1.84 0 0 0 1.57 1.88A1.75 1.75 0 0 0 6.25 9.5a.75.75 0 0 1 1.5 0 1.67 1.67 0 0 0 1.75 1.75 1.76 1.76 0 0 0 1.75-1.75.75.75 0 0 1 1.5 0 1.67 1.67 0 0 0 1.75 1.75 1.76 1.76 0 0 0 1.75-1.75.75.75 0 0 1 1.5 0 1.75 1.75 0 0 0 1.93 1.74 1.84 1.84 0 0 0 1.57-1.88v-.71a3.27 3.27 0 0 0-.17-1l-1.56-4.7a.26.26 0 0 0-.24-.17z"
                        data-original="#000000"
                      />
                      <path
                        d="M20 22.75H4A1.76 1.76 0 0 1 2.25 21v-9.52a.75.75 0 0 1 1.5 0V21a.25.25 0 0 0 .25.25h16a.25.25 0 0 0 .25-.25v-9.53a.75.75 0 1 1 1.5 0V21A1.76 1.76 0 0 1 20 22.75z"
                        data-original="#000000"
                      />
                      <path
                        d="M15.5 22.75h-7a.76.76 0 0 1-.75-.75v-5a1.76 1.76 0 0 1 1.75-1.75h5A1.76 1.76 0 0 1 16.25 17v5a.76.76 0 0 1-.75.75zm-6.25-1.5h5.5V17a.25.25 0 0 0-.25-.25h-5a.25.25 0 0 0-.25.25z"
                        data-original="#000000"
                      />
                    </g>
                  </svg>
                  Stores and Services
                </li>
              </Link>
              <li className="max-lg:py-2 px-3 mr-5  cursor-pointer">
                <span className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    className="inline"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                      data-original="#000000"
                    ></path>
                  </svg>
                  <span className="absolute left-auto -ml-1 -top-1 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
                    0
                  </span>
                </span>
              </li>
              <img className="rounded-full w-10" src={user?.photoURL} alt="" />
              {user ? (
                <>
                  {" "}
                  <li className="flex text-[15px] max-lg:py-2 px-3 hover:text-[#007bff] hover:fill-[#007bff]">
                    <Link to="/">
                      {" "}
                      <button
                        onClick={handleSignOut}
                        className="px-4 py-2 text-sm rounded font-semibold text-[#333] border-2 border-[#333] bg-transparent"
                      >
                        Logout
                      </button>
                    </Link>
                  </li>{" "}
                </>
              ) : (
                <>
                  <li className="flex  hover:text-[#007bff] hover:fill-[#007bff]">
                    <Link to="/login">
                      {" "}
                      <button className="px-5 py-2 text-base rounded font-semibold text-[#333] border-2 border-[#333] bg-transparent">
                        Login
                      </button>
                    </Link>
                  </li>
                  <li className="flex px-3 hover:text-[#007bff] hover:fill-[#007bff]">
                    <Link to="/sign-up">
                      {" "}
                      <button className="px-4 py-2 text-base rounded font-semibold text-[#333] border-2 border-[#333] bg-transparent">
                        Sign Up
                      </button>
                    </Link>
                  </li>
                </>
              )}
              <li id="toggleOpen" className="lg:hidden">
                <button onClick={handleMenuToggle}>
                  <svg
                    className="w-7 h-7"
                    fill="#333"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div>
        <button
          id="collapseMenu"
          // className={`max-lg:${isMenuOpen ? "block" : "hidden"} lg:block`}
          className={`max-lg:${
            isMenuOpen
              ? "block before:fixed before:bg-black before:opacity-50 before:inset-0 before:z-50"
              : "hidden"
          } lg:block`}
        ></button>
        <button
          id="toggleClose"
          className={`lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          onClick={handleMenuToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 fill-black"
            viewBox="0 0 320.591 320.591"
          >
            <path
              d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
              data-original="#000000"
            ></path>
            <path
              d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
              data-original="#000000"
            ></path>
          </svg>
        </button>

        <ul
          className={`lg:flex lg:flex-wrap lg:items-center lg:justify-center px-10 py-3 bg-[#333] min-h-[46px] gap-4 max-lg:space-y-4 max-lg:fixed max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          {/* Your list items here */}
          <li className="mb-6 hidden max-lg:block">
            <img
              src="https://readymadeui.com/readymadeui-white.svg"
              alt="logo"
              className="w-36"
            />
          </li>

          <li className="max-lg:border-b max-lg:py-3 px-3">
            <a
              href="/"
              className="hover:text-yellow-300 text-yellow-300 text-[15px] font-medium block"
            >
              Home
            </a>
          </li>

          <li className="max-lg:border-b max-lg:py-3 px-3">
            <a
              href="/products"
              className="hover:text-yellow-300 text-white text-[15px] font-medium block"
            >
              Products
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
