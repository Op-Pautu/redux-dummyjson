"use client";

import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const ProductPage = () => {
  const { id } = useParams();

  const products = useAppSelector((state) => state.products.products);

  const product = products.find((product) =>
    typeof product.id === "number"
      ? product.id === parseInt(id)
      : product.id === id
  );
  console.log(product);
  if (!product) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="rounded-lg flex flex-col gap-4 text-black px-4 py-2 h-[650px] w-[800px]">
        <div className="flex gap-8">
          <img
            src={product.images ? product.images[0] : "/default-slate.png"}
            alt=""
            width={450}
            height={390}
          />
          <div className="flex flex-col gap-6">
            <h4 className="text-lg">{product.title}</h4>
            <p className="text-xl">
              {product.description} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Porro, magnam. Repudiandae minus quibusdam
              officiis adipisci, dolorem quam cum, eveniet corrupti voluptate
              sequi, neque ducimus! Veritatis assumenda explicabo numquam
              temporibus quis.
            </p>
          </div>
        </div>
        <div className="flex w-full mx-auto mt-6">
          <Link
            href={`/edit/${product.id}`}
            className="w-full py-4 text-center text-white bg-blue-400 rounded-lg px-14 hover:bg-blue-600"
          >
            Edit Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
