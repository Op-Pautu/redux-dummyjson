"use client";
import { fetchProducts } from "@/lib/features/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect } from "react";
import Products from "./Products";
import Link from "next/link";

const Wrapper = ({ children }) => {
  const dispatch = useAppDispatch();
  const productStatus = useAppSelector((state) => state.products.status);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  return <>{children}</>;
};

export default Wrapper;
