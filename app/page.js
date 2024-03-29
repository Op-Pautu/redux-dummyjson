"use client";
import { fetchProducts } from "@/lib/features/productSlice";
import useFetchProducts, { useAppDispatch, useAppSelector } from "@/lib/hooks";

import React, { useEffect } from "react";

import Link from "next/link";
import Products from "@/components/Products";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full h-full mx-auto bg-zinc-100">
      <div className="p-16 grid grid-cols-4 gap-8 max-w-[1600px] bg-slate-100 mx-auto">
        <Link
          href="/add"
          className="col-span-4 px-8 py-4 text-white bg-blue-600 border rounded-lg shadow-md text-md hover:bg-blue-700"
        >
          Add a new product
        </Link>

        <Products />
      </div>
    </div>
  );
};

export default HomePage;
