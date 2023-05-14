import React from "react";
import { Form, Link, useSearchParams } from "react-router-dom";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <>
      <Form method="post">
        <h1>{isLogin ? "Login" : "Sign up"}</h1>
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
        <div>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Sign up" : "Login"}
          </Link>
          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
