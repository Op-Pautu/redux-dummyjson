"use client";

import Product from "@/components/Product";
import { useAxios } from "@/lib/useAxios";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const { products, error, loading } = useAxios();

  return (
    <div className="flex w-full mx-auto bg-zinc-100 flex-col h-full">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="p-16 grid grid-cols-4 gap-8 max-w-[1600px] bg-slate-100 mx-auto">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
