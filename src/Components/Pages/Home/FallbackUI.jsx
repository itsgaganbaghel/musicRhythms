import React from "react";

const FallbackUI = ({ data }) => {
  return (
    <section className="h-[100vh] w-full flex justify-center items-center bg-primary text-white ">
      <p className="text-3xl">{data} is Loading </p>
    </section>
  );
};

export default FallbackUI;
