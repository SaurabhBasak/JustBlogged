import React from "react";
import AuthForm from "./AuthForm";
import { json, redirect } from "react-router-dom";

function Auth() {
  return <AuthForm />;
}

export default Auth;

export async function action(request) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  const response = await fetch("http://127.0.0.1:8000/" + mode, {
    method: "POST",
    body: JSON.stringify(authData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  if (mode === "login") {
    const token = resData.token;
    console.log(token);
    localStorage.setItem("token", token);
  }

  return redirect("/");
}
