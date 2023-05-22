import React from "react";
import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

function MainNavigation() {
  const token = useRouteLoaderData("root");

  return (
    <header>
      <nav>
        <ul className="mt-8 flex justify-center gap-5 px-3 py-2 font-mono font-semibold text-white">
          <li>
            <NavLink to="" className="rounded-full">
              Home
            </NavLink>
          </li>
          {!token && (
            <li>
              <NavLink to="auth?mode=signup" className="rounded-full">
                Signup/Login
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
