import { redirect } from "next/navigation";
import { getToken, logout, storeJwt } from "./jwtStore";

export async function requestInterceptor(
  url: string,
  input: unknown,
  method: string
) {
  let redirectPath = "";
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
      redirectPath = "/login";
    }
    // console.log(status);
    // console.log(data);
    return { status: status, data: data };
  } catch (error) {
    console.log(error);
  } finally {
    if (redirectPath !== "") {
      redirect(redirectPath);
    }
  }
}

export async function loginRequestInterceptor(input: unknown) {
  let redirectPath = "";
  try {
    const BASEURL = "http://localhost:9000";

    const response = await fetch(BASEURL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    const status = response.status;
    if (status === 200) {
      const data = await response.json();
      const message = await storeJwt({ status, data });
      if (message.status === 200) {
        redirectPath = "/dashboard";
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (redirectPath !== "") redirect(redirectPath);
  }
}

export async function checkIfJwtValid() {
  let redirectPath = "";
  try {
    const token = await getToken();
    if (token !== undefined) {
      const output = await requestInterceptor(
        "login/checkIfJwtValid",
        "",
        "POST"
      );
      if (output?.status === 200) {
        redirectPath = "/dashboard";
      }
    } else {
      redirectPath = "/login";
    }
  } catch (error) {
    console.log(error);
  } finally {
    // const path = window.location.pathname;
    // if (redirectPath !== "" && !path.includes(redirectPath)) {
    if (redirectPath !== "") {
      redirect(redirectPath);
    }
  }
}
