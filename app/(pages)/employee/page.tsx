"use client";
import JwtExpiryDialog from "@/app/components/JwtExpiryDialog";
import { checkIfJwtValid } from "@/app/utils/utils";
import React, { useEffect } from "react";

const Employee = () => {
  useEffect(() => {
    checkIfJwtValid("dashboard");
  }, []);
  return (
    <div>
      {/* <JwtExpiryDialog /> */}
      Employee
    </div>
  );
};

export default Employee;
