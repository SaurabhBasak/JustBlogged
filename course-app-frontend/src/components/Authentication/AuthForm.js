import React from "react";
import { Form, Link, useSearchParams } from "react-router-dom";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <div className="flex justify-center pt-5">
      <Form method="post">
        <h1 className="flex justify-center text-white">{isLogin ? "Login" : "Sign up"}</h1>
        <div className="flex flex-col gap-3 py-2">  
            <p>
            <input
                placeholder="Username"
                id="username"
                type="username"
                name="username"
                required
            />
            </p>
            <p>
            <input
                placeholder="Password"
                id="password"
                type="password"
                name="password"
                required
                />
            </p>
        </div>
        <div className="flex justify-center gap-5">
          <Link to={`?mode=${isLogin ? "signup" : "login"}`} className="text-white">
            {isLogin ? "Sign up" : "Login"}
          </Link>
          <button className="text-white">Save</button>
        </div>
      </Form>
    </div>
  );
}

export default AuthForm;
