"use client";

import { useEffect, useState } from "react";
import { checkIfJwtValid, requestInterceptor } from "../utils/utils";

type Product = {
  id: string;
  name: string;
  genericName: string;
  productType: {
    name: string;
  };
};

const Dashboard = () => {
  const [text, setText] = useState("");
  const [output, setOutput] = useState([]);
  useEffect(() => {
    checkIfJwtValid();
  }, []);

  useEffect(() => {
    async function fullTextSearch() {
      if (text !== "") {
        const o = await requestInterceptor(
          `api/product/v1/fullTextSearch/${text}`,
          "",
          "GET"
        );
        setOutput(o?.data);
        // console.log(o?.data);
      }
    }
    fullTextSearch();
  }, [text]);

  return (
    <div>
      Search
      <input
        type="text"
        name="search"
        id="search"
        onChange={(e) => setText(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Generic Name</th>
            <th>Product Type</th>
          </tr>
        </thead>
        <tbody>
          {output.map((product: Product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.genericName}</td>
              <td>{product.productType.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
