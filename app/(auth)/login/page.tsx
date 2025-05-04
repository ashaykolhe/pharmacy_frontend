"use client";

import { checkIfJwtValid, loginRequestInterceptor } from "@/app/utils/utils";
import React, { FormEvent, useEffect, useState } from "react";

const Login = () => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const input: unknown = {
      username: username,
      password: password,
    };

    const data = await loginRequestInterceptor(input);
    console.log(data?.data.message);
    setError(data?.data.message);
  };

  useEffect(() => {
    checkIfJwtValid("login");
  }, []);

  useEffect(() => {
    setError("");
  }, [username, password]);

  return (
    <section className="grid min-h-screen place-items-center p-16">
      <div className="w-72 rounded-md p-4 pt-0 shadow-lg">
        <form className="grid gap-3" onSubmit={handleSubmit}>
          <input
            autoFocus
            className="input"
            name="username"
            type="text"
            required
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="input"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="submit" type="submit">
            <span>Sign In</span>
          </button>
          <span className="error">{error}</span>
        </form>
      </div>
    </section>
  );
};

export default Login;
