"use client";

import { addNewProduct, addProduct } from "@/lib/features/productSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const AddProductForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  // const products = useAppSelector((state) => state.products);
  // console.log(products);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const canSave =
    [title, description].every(Boolean) && addRequestStatus === "idle";

  const handleSubmit = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        if (title && description) {
          await dispatch(addNewProduct({ title, description })).unwrap();
        }
        setTitle("");
        setDescription("");
        toast.success("Added Product");
        router.push("/");
      } catch (error) {
        console.log("Failed to save the post: ", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-14">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label htmlFor="title">Add Title</label>
        <input
          className="focus:ring-transparent focus:ring-0 p-[10px] border rounded-lg shadow-sm focus:outline-none"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
        />
        <label htmlFor="description">Add Description</label>
        <input
          className="focus:ring-transparent focus:ring-0 p-[10px] border rounded-lg shadow-sm focus:outline-none"
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description"
        />
        <button
          className="w-full p-4 text-white bg-blue-500 border rounded-lg hover:bg-blue-600"
          type="submit"
        >
          Add Product
        </button>
      </form>
      {/* <div>
        {products.map((product) => (
          <div key={product.id}>{product.title}</div>
        ))}
      </div> */}
    </div>
  );
};

export default AddProductForm;
