import { redirect } from "next/navigation";
import { getToken } from "./jwtStore";

export default async function requestInterceptor(url, input, method) {
  let redirectPath = "";
  try {
    const BASEURL = "http://localhost:9000";

    let headers;
    if (url === "login") {
      headers = {
        "Content-Type": "application/json",
      };
    } else {
      headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await getToken()),
      };
    }

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
