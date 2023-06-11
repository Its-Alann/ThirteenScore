"use client";

import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { usePlayerContext, Player } from "@/app/context/player";
import "react-toastify/dist/ReactToastify.css";

export default function BasicTable() {
  const [ID, setID] = useState(2);
  const [validNames, setValidNames] = useState(true);
  const router = useRouter();
  const { players, setPlayers } = usePlayerContext();

  // const [players, setPlayers] = useState<Player[]>([
  //   { id: 0, name: "Player 1" },
  //   { id: 1, name: "Player 2" },
  // ]);

  const addPlayer = (ID: number) => {
    const newPlayer: Player = {
      id: ID,
      name: `Player ${ID + 1}`,
      score: 0,
    };
    setID(ID + 1);
    setPlayers([...players, newPlayer]);
  };

  const removePlayer = (id: number) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  const changeNames = (id: number, name: string) => {
    players.map((player) => {
      if (player.id === id) {
        player.name = name;
      }
    });

    // Need to find an alt for this
    checkNames();
  };

  const checkNames = () => {
    const isValid = players.every((player) => player.name.trim() !== "");
    setValidNames(isValid);
  };

  const handleSubmit = () => {
    if (validNames && players.length >= 2) {
      console.log(players);
      setPlayers(players);
      router.push("/game");
    } else {
      if (!validNames) {
        console.error("Invalid player names");
        toast.error("Enter all player names", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      if (players.length < 2) {
        toast.error("Minimum 2 players required", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  useEffect(() => {
    setPlayers([
      { id: 0, name: "Player 1", score: 0 },
      { id: 1, name: "Player 2", score: 0 },
    ]);
  }, []);

  return (
    <div>
      <div>
        <TableContainer component={Paper} className="shadow-md">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right"> {} </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map((player) => (
                <TableRow
                  key={player.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="h-10">
                    <input
                      type="text"
                      placeholder="Enter name"
                      className="input input-bordered input-sm w-1/2 max-w-xs"
                      defaultValue={`Player ${player.id + 1}`}
                      onChange={(e: React.FormEvent<HTMLInputElement>) =>
                        changeNames(player.id, e.currentTarget.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <div className="flex justify-end">
                      <button
                        className="btn btn-sm btn-outline btn-error"
                        onClick={() => removePlayer(player.id)}
                      >
                        <HiOutlineMinus />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>Add new player</TableCell>
                <TableCell align="right">
                  <div className="flex justify-end">
                    <button
                      className="btn btn-sm btn-outline btn-primary"
                      onClick={() => addPlayer(ID)}
                    >
                      <HiOutlinePlus />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="flex flex-col items-center m-10">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => {
            handleSubmit();
          }}
        >
          Start
        </button>
      </div>

      <div>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
}
