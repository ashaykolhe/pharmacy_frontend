"use client";

import React, { FormEvent, useEffect } from "react";
import { loginRequestInterceptor, checkIfJwtValid } from "@/app/utils/utils";

const Login = () => {
  useEffect(() => {
    checkIfJwtValid();
  }, []);

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
