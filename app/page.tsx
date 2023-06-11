import React from "react";
import Table from "@/components/Table";

const page = () => {
  return (
    <div className="flex flex-col items-center mt-40">
      <div>
        <p className="font-bold text-4xl">Welcome to ThirteenScore</p>
      </div>
      <div className="text-xl">
        Let&apos;s get you started with your 3-13 game
      </div>
      <div className="mt-20">
        <div className=" text-lg">Enter the names of the players</div>
        <div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default page;
