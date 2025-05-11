"use client";
import { redirect } from "next/navigation";
// import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { logout } from "../utils/jwtStore";

const Shortcuts = () => {
  // const router = useRouter();
  type StringKeyObject = {
    [key: string]: boolean;
  };

  const keys: StringKeyObject = {};

  function keyDown(event: KeyboardEvent) {
    // event.stopPropagation();
    keys[event.key] = true;
    if (keys["Alt"] && keys["Shift"]) event.preventDefault();

    console.log(keys);
  }

  function keyUp(event: KeyboardEvent) {
    // console.log("before");
    // console.log(keys);
    if (keys["Alt"] && keys["Shift"]) {
      if (keys["P"]) {
        console.log("alt shift p");
        keys[event.key] = false;
        // router.push("/product");
        redirect("/product");
      } else if (keys["E"]) {
        console.log("alt shift e");
        keys[event.key] = false;
        // router.push("/employee");
        redirect("/employee");
      } else if (keys["D"] && keys["G"]) {
        console.log("alt shift d g");
        keys[event.key] = false;
        // router.push("/dashboard/god");
        redirect("/dashboard/god");
      } else if (keys["D"] && keys["A"]) {
        console.log("alt shift d a");
        keys[event.key] = false;
        // router.push("/dashboard/admin");
        redirect("/dashboard/admin");
      } else if (keys["D"] && keys["U"]) {
        console.log("alt shift d u");
        keys[event.key] = false;
        // router.push("/dashboard/user");
        redirect("/dashboard/user");
      } else if (keys["H"]) {
        console.log("alt shift h");
        keys[event.key] = false;
        // router.push("/home");
        redirect("/home");
      } else if (keys["L"]) {
        console.log("alt shift l");
        keys[event.key] = false;
        // router.push("/home");
        // redirect("/home");
        logout();
      } else {
        console.log("No alt shortcut available");
      }
    } else {
      console.log("No shortcut available");
    }

    keys[event.key] = false;
    // keys = {};
    // console.log("after");
    // console.log(keys);
  }

  useEffect(() => {
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
    return () => {
      console.log("cleanup");
      document.removeEventListener("keydown", keyDown);
      document.removeEventListener("keyup", keyUp);
    };
  }, []);

  return <div></div>;
};

export default Shortcuts;
