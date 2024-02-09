"use client";
import { fetchProducts } from "@/lib/features/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import React, { useEffect } from "react";
import Spinner from "./Spinner";

const Products = () => {
  const products = useAppSelector((state) => state.products.products);

  const dispatch = useAppDispatch();
  const productStatus = useAppSelector((state) => state.products.status);

  console.log(productStatus);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (productStatus === "loading") return <p>Loading</p>;

  console.log("Products:", products);

  if (productStatus === "succeeded") {
    return (
      <>
        {!products.loading &&
          products.length > 0 &&
          products.map((product) => (
            <div className="rounded-lg flex flex-col gap-4 border bg-white/5 text-black px-4 py-2 shadow-lg h-[350px] w-[300px]">
              <div className="flex gap-4 h-1/2">
                {product.images && (
                  <img src={product.images[0]} alt="" width={150} height={60} />
                )}

                <h4>{product.title}</h4>
              </div>
              <p className="h-1/2">{product.description}</p>
            </div>
          ))}
      </>
    );
  }
};

export default Products;
