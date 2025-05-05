"use client";

// import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Output = {
  status: number;
  data: {
    accessToken: string;
    message: string;
  };
};

export function storeJwt(output: Output) {
  // const cookieStore = await cookies();
  // cookieStore.delete("token");
  localStorage.removeItem("token");
  if (output?.status === 400) {
    return { status: "failure", message: output?.data.message };
  } else {
    // cookieStore.set({
    //   name: "token",
    //   value: output?.data.accessToken,
    //   httpOnly: true,
    // });
    localStorage.setItem("token", output?.data.accessToken);
    return { status: output?.status, message: "success" };
  }
}

export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

export async function logout() {
  // const cookieStore = await cookies();
  // cookieStore.delete("token");
  localStorage.removeItem("token");
  redirect("/login");
}
