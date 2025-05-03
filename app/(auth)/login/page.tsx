"use client";

import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import requestInterceptor from "@/app/utils/utils";
import { storeJwt } from "@/app/utils/jwtStore";

const Login = () => {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const input = {
      username: username,
      password: password,
    };

    const output = await requestInterceptor("login", input, "POST");
    const message = await storeJwt(output);
    if (message.status === 200) {
      router.push("/dashboard");
    }
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
