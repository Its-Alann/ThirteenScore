"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Player {
  id: number;
  name: string;
  score: number;
  history?: { round: number; score: number }[];
}

interface PlayerContextProps {
  players: Player[];
  setPlayers: (players: Player[]) => void;
}

interface Props {
  children?: ReactNode;
}

const PlayerContext = createContext<PlayerContextProps>({
  players: [],
  setPlayers: (): [] => [],
});

export const PlayerContextProvider = ({ children }: Props) => {
  const [players, setPlayers] = useState<Player[]>([]);

  return (
    <PlayerContext.Provider value={{ players, setPlayers }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
