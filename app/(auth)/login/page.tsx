"use client";

import { checkIfJwtValid, loginRequestInterceptor } from "@/app/utils/utils";
import React, { FormEvent, useEffect } from "react";

const Login = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const input: unknown = {
      username: username,
      password: password,
    };

    loginRequestInterceptor(input);
  };

  useEffect(() => {
    checkIfJwtValid("login");
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
