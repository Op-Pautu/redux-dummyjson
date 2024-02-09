"use client";

import React from "react";

const AddProductForm = () => {
  return (
    <form className="flex flex-col gap-2">
      <label htmlFor="title">Add Title</label>
      <input type="text" id="title" placeholder="title" />
      <label htmlFor="description">Add Title</label>
      <input type="text" id="description" placeholder="title" />
    </form>
  );
};

export default AddProductForm;
