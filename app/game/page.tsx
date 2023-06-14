"use client";

import React, { useEffect, useState } from "react";
import { usePlayerContext } from "../context/player";
import Scoreboard from "../../components/Scoreboard";
import { VscDebugRestart } from "react-icons/vsc";
import { AiFillCaretRight } from "react-icons/ai";
import { useRouter } from "next/navigation";

const Page = () => {
  const { players, setPlayers } = usePlayerContext();
  const router = useRouter();
  const [round, setRound] = useState<number>(1);
  const MAX_ROUND = 13;

  const handleRestart = () => {
    router.push("/");
  };

  const [history, setHistory] = useState([{ round: 0, score: 0 }]);

  const handleNextRound = (round: number, score: number) => {
    setRound(round + 1);
    setHistory((prevHistory) => {
      if (round === 1) {
        prevHistory.pop();
      }
      return [
        ...prevHistory,
        {
          round,
          score,
        },
      ];
    });
    console.log("history", history);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="font-bold text-4xl text-primary mt-40">
        {" "}
        Round {round}{" "}
      </div>
      <div className="font-bold text-xl text-secondary my-10"> Scoreboard </div>
      <div className="w-1/4 items-center">
        <Scoreboard round={round} history={history} />
      </div>
      <div className="space-x-8 my-14">
        <span>
          <button
            className="btn btn-sm btn-outline btn-error normal-case w-40 h-12"
            onClick={() => {
              handleRestart();
            }}
          >
            Restart
            <VscDebugRestart />
          </button>
        </span>
        <span>
          <button
            className="btn btn-sm btn-outline btn-primary normal-case w-40 h-12"
            onClick={() => {
              handleNextRound(round, 44);
            }}
          >
            Next Round
            <AiFillCaretRight />
          </button>
        </span>
      </div>
    </div>
  );
};

export default Page;
