import React from "react";
import Table from "@/components/Table";

const page = () => {
  return (
    <div className="flex flex-col justify-center w-full py-20 px-10 md:px-52">
      <p className="font-bold text-4xl text-center">Welcome to ThirteenScore</p>
      <p className="text-xl text-center">
        Let&apos;s get you started with your 3-13 game
      </p>
      <p className=" text-lg pt-10">Enter the names of the players</p>
      <div className="flex items-center w-full">
        <Table />
      </div>
    </div>
  );
};

export default page;
