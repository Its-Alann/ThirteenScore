"use client";

import React, { useEffect } from "react";
import { usePlayerContext } from "../context/player";
import Scoreboard from "../../components/Scoreboard";

const Page = () => {
  const { players, setPlayers } = usePlayerContext();
  return (
    <div className="flex flex-col items-center">
      <div className="font-bold text-4xl text-primary mt-40"> Round 1 </div>
      <div className="font-bold text-xl text-secondary my-10">
        {" "}
        Leaderboard{" "}
      </div>
      <div className="w-1/4 items-center">
        <Scoreboard />
      </div>
    </div>
  );
};

export default Page;
