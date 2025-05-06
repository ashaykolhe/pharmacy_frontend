"use client";

import { checkIfJwtValid } from "@/app/utils/utils";
import React, { useEffect } from "react";

const Manufacturer = () => {
  useEffect(() => {
    checkIfJwtValid("manufacturer");
  }, []);
  return <div>Manufacturer</div>;
};

export default Manufacturer;
