"use client";

import { createContext, useContext, useState } from "react";

export interface Player {
  id: number;
  name: string;
  score: number;
}

interface PlayerContextProps {
  players: Player[];
  setPlayers: (players: Player[]) => void;
}

const PlayerContext = createContext<PlayerContextProps>({
  players: [],
  setPlayers: (): [] => [],
});

export const PlayerContextProvider = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([]);

  return (
    <PlayerContext.Provider value={{ players, setPlayers }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
