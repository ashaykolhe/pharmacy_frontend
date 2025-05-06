"use client";

import { checkIfJwtValid } from "@/app/utils/utils";
import React, { useEffect } from "react";

const Employee = () => {
  useEffect(() => {
    checkIfJwtValid("employee");
  }, []);
  return <div>Employee</div>;
};

export default Employee;
