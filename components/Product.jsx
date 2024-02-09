import Image from "next/image";
import React from "react";

const Product = ({ product }) => {
  return (
    <div className="rounded-lg flex flex-col gap-4 border bg-white/5 text-black px-4 py-2 shadow-lg h-[350px] w-[300px]">
      <div className="flex gap-4 h-1/2">
        <Image src={product.images[0]} alt="" width={150} height={60} />
        <h4>{product.title}</h4>
      </div>
      <p className="h-1/2">{product.description}</p>
    </div>
  );
};

export default Product;
