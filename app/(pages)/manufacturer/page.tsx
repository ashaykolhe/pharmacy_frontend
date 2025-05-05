"use client";
import JwtExpiryDialog from "@/app/components/JwtExpiryDialog";
import { checkIfJwtValid } from "@/app/utils/utils";
import React, { useEffect } from "react";

const Manufacturer = () => {
  useEffect(() => {
    checkIfJwtValid("dashboard");
  }, []);
  return (
    <div>
      {/* <JwtExpiryDialog /> */}
      Manufacturer
    </div>
  );
};

export default Manufacturer;
