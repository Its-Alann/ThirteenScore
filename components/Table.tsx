"use client";

import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

export default function BasicTable() {
  interface Player {
    id: number;
    name: string;
  }

  const [ID, setID] = useState(2);

  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "Player 1" },
  ]);

  const addPlayer = (ID: number) => {
    const newPlayer: Player = {
      id: ID,
      name: `Player ${ID}`,
    };
    setID(ID + 1);
    setPlayers([...players, newPlayer]);
    console.log(players);
  };

  const removePlayer = (id: number) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  const changeName = (id: number, name: string) => {
    const updatedPlayers = players.map((player) =>
      player.id === id ? { ...player, name: name } : player
    );
  };

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
                      className="input input-bordered input-sm  w-1/2 max-w-xs"
                      defaultValue={`Player ${player.id}`}
                      onChange={() => changeName(player.id)}
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
          onClick={() => console.log(players)}
        >
          Start
        </button>
      </div>
    </div>
  );
}
