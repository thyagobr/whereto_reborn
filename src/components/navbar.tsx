import { logout } from "@/lib/logout";
import { createRef } from "react";
import { Roboto } from "next/font/google";
const RobotoFont = Roboto({ weight: "300", subsets: ["latin"] });

function Navbar() {
  const menu = createRef<HTMLDivElement>();

  function toggleHidden() {
    if (!menu || !menu.current) return;
    if (menu.current.classList.contains("hidden")) {
      menu.current.classList.remove("hidden");
    } else {
      menu.current.classList.add("hidden");
    }
  }

  return (
    <nav className={`bg-transparent text-white ${RobotoFont.className}`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-3">
        <div className="flex items-center">
          <span className="self-center font-semibold whitespace-nowrap text-purple-200">
            <a href="/">whereto</a>
          </span>
        </div>
        <button
          type="button"
          onClick={toggleHidden}
          id="sandwich"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
          </svg>
        </button>
        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-default"
          ref={menu}
        >
          <ul>
            <li>
              <span className="" aria-current="page" onClick={logout}>
                sign out
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
