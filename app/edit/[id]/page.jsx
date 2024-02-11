"use client";
import Spinner from "@/components/Spinner";
import { productUpdated } from "@/lib/features/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const EditPage = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const router = useRouter();
  const products = useAppSelector((state) => state.products.products);
  const productStatus = useAppSelector((state) => state.products.status);

  const product = products.find((product) =>
    typeof product.id === "number"
      ? product.id === parseInt(id)
      : product.id === id
  );
  const [title, setTitle] = useState(product?.title);
  const [description, setDescription] = useState(product?.description);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

  const onSaveProductClicked = () => {
    if (title && description) {
      dispatch(productUpdated({ id: product.id, title, description }));
      router.replace(`/products/${product.id}`);
    }
  };
  if (productStatus === "loading") return <Spinner />;
  if (productStatus === "succeeded") {
    return (
      <section className="max-w-4xl mx-auto mt-14">
        <form className="flex flex-col gap-4">
          <label htmlFor="productTitle">Title:</label>
          <input
            type="text"
            id="productTitle"
            name="productTitle"
            placeholder="What's on your mind?"
            value={title}
            onChange={onTitleChanged}
            className="p-4 border"
          />
          <label htmlFor="productContent">Content:</label>
          <textarea
            id="productContent"
            name="productContent"
            value={description}
            onChange={onDescriptionChanged}
            className="p-4 border"
          />
          <button
            type="button"
            onClick={onSaveProductClicked}
            className="p-4 text-white bg-blue-400 hover:bg-blue-600"
          >
            Save Product
          </button>
        </form>
      </section>
    );
  }
};

export default EditPage;
