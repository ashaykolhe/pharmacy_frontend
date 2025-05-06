"use client";

import { checkIfJwtValid } from "@/app/utils/utils";
import React, { useEffect } from "react";

const AddProduct = () => {
  useEffect(() => {
    checkIfJwtValid("/product/add");
  }, []);
  return <div>Add Product</div>;
};

export default AddProduct;
