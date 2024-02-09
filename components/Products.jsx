"use client";
import { fetchProducts } from "@/lib/features/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import React, { useEffect } from "react";
import Spinner from "./Spinner";

const Products = () => {
  const products = useAppSelector((state) => state.products.products);

  const dispatch = useAppDispatch();
  const productStatus = useAppSelector((state) => state.products.status);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  if (productStatus === "loading") return <p>Loading</p>;

  if (productStatus === "succeeded") {
    return (
      <>
        {!products.loading &&
          products.length > 0 &&
          products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg flex flex-col gap-4 border bg-white/5 text-black px-4 py-2 shadow-lg h-[350px] w-[300px]"
            >
              <div className="flex gap-4 h-1/2">
                <img
                  src={
                    product.images ? product.images[0] : "/default-slate.png"
                  }
                  alt=""
                  width={150}
                  height={60}
                />

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
