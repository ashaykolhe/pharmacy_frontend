"use client";

import { checkIfJwtValid } from "@/app/utils/utils";
import React, { useEffect } from "react";

const Product = () => {
  useEffect(() => {
    checkIfJwtValid("/product");
  }, []);
  return <div>Product</div>;
};

export default Product;
