"use client";

import { useAxios } from "@/lib/useAxios";
// import { setProducts } from "./features/productSlice";
// import { useAppDispatch, useAppSelector } from "./hooks";

import React from "react";

const Products = () => {
  const { products, error, loading } = useAxios(
    "https://dummyjson.com/products"
  );

  return (
    <>
      {products?.map((product) => (
        <div className="rounded-lg flex flex-col gap-4 border bg-white/5 text-black px-4 py-2 shadow-lg h-[350px] w-[300px]">
          <div className="flex gap-4 h-1/2">
            <img src={product.images[0]} alt="" width={150} height={60} />
            <h4>{product.title}</h4>
          </div>
          <p className="h-1/2">{product.description}</p>
        </div>
      ))}
    </>
  );
};

export default Products;
