"use client";
import JwtExpiryDialog from "@/app/components/JwtExpiryDialog";
import { checkIfJwtValid } from "@/app/utils/utils";
import React, { useEffect } from "react";

const AddProduct = () => {
  useEffect(() => {
    checkIfJwtValid("dashboard");
  }, []);
  return (
    <div>
      {/* <JwtExpiryDialog /> */}
      Add Product
    </div>
  );
};

export default AddProduct;
