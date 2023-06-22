"use client";

import React, { useEffect, useState } from "react";
import { usePlayerContext } from "../context/player";
import Scoreboard from "../../components/Scoreboard";
import { VscDebugRestart } from "react-icons/vsc";
import { AiFillCaretRight } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Page = () => {
  const { players, setPlayers } = usePlayerContext();
  const router = useRouter();
  const [round, setRound] = useState<number>(1);
  const MAX_ROUND = 13;
  const [loading, setLoading] = useState(false);

  const handleRestart = () => {
    setLoading(true);
    router.push("/");
  };

  const handleNextRound = (round: number) => {
    players.map((player) => {
      player.history?.push({ round: round, score: player.score });
    });

    setRound(round + 1);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="font-bold text-4xl text-primary mt-40">
        {" "}
        Round {round}{" "}
      </div>
      <div className="font-bold text-xl text-secondary my-10"> Scoreboard </div>
      <div className="w-600 items-center shadow-2xl">
        <Scoreboard round={round} />
      </div>
      <div className="space-x-8 my-14">
        <span>
          <button
            className="btn btn-sm btn-outline btn-error normal-case w-40 h-12 transition duration-500 ease-in-out hover:scale-105"
            onClick={() => window.my_modal_2.showModal()}
          >
            Restart
            <VscDebugRestart />
          </button>
          <dialog id="my_modal_2" className="modal">
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">Oh oh</h3>
              <p className="py-4">
                Are you sure you want to restart your game? There&apos;s no
                going back...
              </p>
              <div className="space-x-8 flex justify-center">
                <span>
                  {loading ? (
                    <div className="flex items-center">
                      {/* <span> Loading </span>
                       */}
                      <button
                        className="btn btn-sm btn-outline btn-error normal-case w-40 h-12 transition duration-500 ease-in-out hover:scale-105"
                        style={{ opacity: 0.65, pointerEvents: "none" }}
                      >
                        Loading
                        <FaSpinner className="animate-spin ml-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline btn-error normal-case w-40 h-12 transition duration-500 ease-in-out hover:scale-105"
                      onClick={() => {
                        handleRestart();
                      }}
                    >
                      Restart
                      <VscDebugRestart />
                    </button>
                  )}
                </span>

                <span>
                  <button
                    className="btn btn-sm btn-outline btn-success normal-case w-40 h-12 transition duration-500 ease-in-out hover:scale-105"
                    onClick={() => {}}
                  >
                    Cancel
                    <MdOutlineCancel />
                  </button>
                </span>
              </div>
            </form>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </span>
        <span>
          <button
            className="btn btn-sm btn-outline btn-primary normal-case w-40 h-12 transition duration-500 ease-in-out hover:scale-110"
            onClick={() => {
              handleNextRound(round);
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
