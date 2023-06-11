"use client";

import React, { useEffect } from "react";
import { usePlayerContext } from "../context/player";

const Page = () => {
  const { players, setPlayers } = usePlayerContext();
  return (
    <div>
      {players.map((e, i) => (
        <p key={i}>
          {" "}
          {e.name} {e.score}
        </p>
      ))}
    </div>
  );
};

export default Page;
