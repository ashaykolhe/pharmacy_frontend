import { redirect } from "next/navigation";

import { jwtDecode } from "jwt-decode";
import { logout, storeJwt } from "./jwtStore";

export async function requestInterceptor(
  url: string,
  input: unknown,
  method: string
) {
  try {
    const BASEURL = "http://localhost:9000";

    const headers = {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + (await getToken()),
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    let response;
    if (method === "POST" || method === "PUT") {
      response = await fetch(BASEURL + "/" + url, {
        method: method,
        headers: headers,
        body: JSON.stringify(input),
      });
    } else {
      response = await fetch(BASEURL + "/" + url, {
        method: method,
        headers: headers,
      });
    }

    const status = response.status;
    const data = await response.json();
    if (status === 401) {
      logout();
    }
    // console.log(status);
    // console.log(data);
    return { status: status, data: data };
  } catch (error) {
    console.log("requestInterceptor " + error);
  }
}

export async function loginRequestInterceptor(input: unknown) {
  let redirectPath = "";
  try {
    const BASEURL = "http://localhost:9000";

    const response = await fetch(BASEURL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    const status = response.status;
    const data = await response.json();
    if (status === 200) {
      const message = storeJwt({ status, data });
      if (message.status === 200) {
        redirectPath = "/home";
      }
    } else if (status === 400) {
      return { data };
    }
  } catch (error) {
    console.log("loginRequestInterceptor " + error);
  } finally {
    if (redirectPath !== "") redirect(redirectPath);
  }
}

export async function checkIfJwtValid(path: string) {
  let redirectPath = "";
  try {
    const token = localStorage.getItem("token");
    // console.log("checkIfJwtValid " + token);
    if (token !== null) {
      // console.log(token);
      const expired = isTokenExpiring(token, 0);
      if (expired) {
        logout();
      } else if (!expired && path === "login") {
        redirectPath = "/home";
      }
    } else {
      logout();
    }
  } catch (error) {
    console.log("checkIfJwtValid " + error);
  } finally {
    // const path = window.location.pathname;
    // if (redirectPath !== "" && !path.includes(redirectPath)) {
    // console.log(redirectPath);
    if (redirectPath !== "") {
      redirect(redirectPath);
    }
  }
}

export const isTokenExpiring = (
  token: string | null,
  dialogOpenStartTime: number
) => {
  try {
    if (token !== null) {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      // console.log(decodedToken.exp - currentTime);
      // console.log(decodedToken.exp - currentTime < dialogOpenStartTime);
      if (decodedToken.exp !== undefined) {
        return decodedToken.exp - currentTime < dialogOpenStartTime;
      }
    }
    return false;
  } catch (error) {
    // Handle invalid token or other errors
    console.log("isTokenExpiring " + error);
    return false;
  }
};
