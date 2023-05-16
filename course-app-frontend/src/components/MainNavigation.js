import React from "react";
import { NavLink } from "react-router-dom";

function MainNavigation() {
  return (
    <header>
      <nav>
        <ul className="mt-8 flex justify-center gap-5 px-3 py-2 font-mono font-semibold text-white">
          <li>
            <NavLink to="auth" className="rounded-full">
              Signup/Login
            </NavLink>
          </li>
          <li>
            <NavLink to="" className="rounded-full">
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
