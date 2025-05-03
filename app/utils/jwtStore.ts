"use server";

import { cookies } from "next/headers";

export async function storeJwt(output) {
  const cookieStore = await cookies();
  if (output?.status === 400) {
    return { status: "failure", message: output?.data.message };
  } else {
    cookieStore.set({
      name: "token",
      value: output?.data.accessToken,
      httpOnly: true,
    });
    return { status: output?.status, message: "success" };
  }
}

export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}
