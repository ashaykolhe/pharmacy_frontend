"use client";
import JwtExpiryDialog from "@/app/components/JwtExpiryDialog";
import { checkIfJwtValid } from "@/app/utils/utils";
import React, { useEffect } from "react";

const Product = () => {
  useEffect(() => {
    checkIfJwtValid("dashboard");
  }, []);
  return (
    <div>
      {/* <JwtExpiryDialog /> */}
      Product
    </div>
  );
};

export default Product;
