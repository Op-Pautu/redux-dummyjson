"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const EditPage = () => {
  const params = useParams();
  const id = JSON.parse(params.id);

  const products = useAppSelector((state) => state.products.products);
  const product = products.find((product) => product.id === id);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

  const onSaveProductClicked = () => {
    if (title && description) {
      dispatch(postUpdated({ id: postId, title, content }));
      router.push(`/posts/${postId}`);
    }
  };
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
};

export default EditPage;