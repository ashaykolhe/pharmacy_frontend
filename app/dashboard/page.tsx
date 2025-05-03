import React from "react";
import requestInterceptor from "../utils/utils";

const Dashboard = async () => {
  const output = await requestInterceptor("api/product/v1/findAll", "", "GET");
  console.log(output?.data[0]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
          </tr>
        </thead>
        <tbody>
          {output?.data.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
