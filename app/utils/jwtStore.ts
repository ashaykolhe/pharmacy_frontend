"use client";

import { redirect } from "next/navigation";

type Output = {
  status: number;
  data: {
    accessToken: string;
    message: string;
  };
};

export function storeJwt(output: Output) {
  localStorage.removeItem("token");
  if (output?.status === 400) {
    return { status: "failure", message: output?.data.message };
  } else {
    localStorage.setItem("token", output?.data.accessToken);
    return { status: output?.status, message: "success" };
  }
}

export async function logout() {
  localStorage.removeItem("token");
  console.log("logging out");
  redirect("/login");
}
