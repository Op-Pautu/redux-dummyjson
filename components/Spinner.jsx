import { Loader } from "lucide-react";
import React from "react";

const Spinner = ({ text = "Loading", size = "5em" }) => {
  const header = text ? <h4>{text}</h4> : null;
  return (
    <div className="flex flex-col items-center justify-center">
      {header}
      <div className="text-[10px] m-[10px] w-[5em] h-[5em] rounded-[50%]">
        <Loader />
      </div>
    </div>
  );
};

export default Spinner;
