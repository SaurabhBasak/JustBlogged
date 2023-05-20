import React from "react";
import AuthForm from "./AuthForm";
import { json, redirect } from "react-router-dom";

function Auth() {
  return <AuthForm />;
}

export default Auth;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();

  const formData = new URLSearchParams();
  formData.append("grant_type", "password");
  formData.append("username", data.get("username"));
  formData.append("password", data.get("password"));
  formData.append("scope", "");

  const response = await fetch("http://127.0.0.1:8000/" + mode, {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  if (mode === "login") {
    const resData = await response.json();
    console.log(response);
    console.log(resData);
    const token = resData.token;
    localStorage.setItem("token", token);
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes + 30);
    localStorage.setItem('expiration', expiration.toISOString());
  }

  return redirect("/");
}
