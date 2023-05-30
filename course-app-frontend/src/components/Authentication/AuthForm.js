import React from "react";
import { Form, Link, useSearchParams } from "react-router-dom";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <div className="flex items-center justify-center pt-64">
      <Form method="post">
        <h1 className="pb-3 text-center text-3xl text-white">
          {isLogin ? "Login" : "Sign up"}
        </h1>
        <div className="flex flex-col gap-3 py-2">
          <p>
            <input
              className="rounded bg-gray-100 px-3 py-2"
              placeholder="Username"
              id="username"
              type="username"
              name="username"
              required
            />
          </p>
          <p>
            <input
              className="rounded bg-gray-100 px-3 py-2"
              placeholder="Password"
              id="password"
              type="password"
              name="password"
              required
            />
          </p>
        </div>
        <div className="flex justify-center gap-5">
          <Link
            to={`?mode=${isLogin ? "signup" : "login"}`}
            className="text-white"
          >
            {isLogin ? "Sign up" : "Login"}
          </Link>
          <button className="text-white">
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AuthForm;
