import { redirect } from "next/navigation";
import { getToken, logout, storeJwt } from "./jwtStore";
import { jwtDecode } from "jwt-decode";

export async function requestInterceptor(
  url: string,
  input: unknown,
  method: string
) {
  try {
    const BASEURL = "http://localhost:9000";

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await getToken()),
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
    console.log(error);
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
      const message = await storeJwt({ status, data });
      if (message.status === 200) {
        redirectPath = "/dashboard";
      }
    } else if (status === 400) {
      return { data };
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (redirectPath !== "") redirect(redirectPath);
  }
}

export async function checkIfJwtValid(path: string) {
  let redirectPath = "";
  try {
    const token = await getToken();
    if (token !== undefined) {
      const output = await requestInterceptor(
        "auth/checkIfJwtValid",
        "",
        "POST"
      );
      if (output?.status === 200 && !path.includes("dashboard")) {
        redirectPath = "/dashboard";
      }
    } else if (!path.includes("login")) {
      redirectPath = "/login";
    }
  } catch (error) {
    console.log(error);
  } finally {
    // const path = window.location.pathname;
    // if (redirectPath !== "" && !path.includes(redirectPath)) {
    // console.log(redirectPath);
    if (redirectPath !== "") {
      redirect(redirectPath);
    }
  }
}

export const isTokenExpiring = (token, dialogOpenStartTime = 20) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp - currentTime < dialogOpenStartTime;
  } catch (error) {
    // Handle invalid token or other errors
    return false;
  }
};
