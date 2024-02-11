"use client";

import Spinner from "@/components/Spinner";
import { productDeleted } from "@/lib/features/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const ProductPage = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const productStatus = useAppSelector((state) => state.products.status);

  const product = products.find((product) =>
    typeof product.id === "number"
      ? product.id === parseInt(id)
      : product.id === id
  );
  console.log(product);

  if (productStatus === "loading") return <Spinner />;

  const handleClick = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(productDeleted(id));
    toast.success("Product deleted");
    router.push("/");
    setOpen(false);
  };

  if (productStatus === "succeeded") {
    return (
      <div className="flex items-center justify-center mt-20">
        <div
          className={`relative rounded-lg flex flex-col gap-4 text-black px-4 py-2 h-[650px] w-[800px] ${
            open ? "backdrop-blur-2xl bg-white/10" : ""
          }`}
        >
          {open && (
            <div
              id="modal-box"
              className="sm:w-[385px] flex flex-col items-center gap-2 backdrop-blur-xl p-6 z-40 bg-white bg-opacity-75 shadow-lg rounded-lg -translate-y-1/2  top-1/2 left-1/2 -translate-x-1/2 absolute"
            >
              <span className="text-2xl font-medium">Are you sure?</span>

              <button
                id="modal-close"
                className="w-full p-3 text-white bg-red-600 rounded-lg hover:bg-red-700"
                onClick={() => handleDelete(product.id)}
              >
                Delete Post
              </button>
            </div>
          )}
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
          <div className="flex w-full mx-auto mt-3">
            <Link
              href={`/edit/${product.id}`}
              className="w-full py-4 text-center text-white bg-blue-400 rounded-lg px-14 hover:bg-blue-600"
            >
              Edit Product
            </Link>
          </div>
          <div className="flex w-full mx-auto mt-2">
            <button
              onClick={handleClick}
              className="w-full py-4 text-center text-white bg-red-400 rounded-lg px-14 hover:bg-red-600"
            >
              Remove Product
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductPage;
