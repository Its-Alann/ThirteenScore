import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { usePlayerContext } from "../app/context/player";

export function createData(
  player: string,
  score: number,
  history: { round: number; score: number }[],
  id: number
) {
  return {
    player,
    score,
    history,
    id,
  };
}

function Row(props: {
  row: ReturnType<typeof createData>;
  round: number;
  playerID: number;
}) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const { players, setPlayers } = usePlayerContext();
  const [defaultScore, setDefaultScore] = React.useState(0);

  const updateCurrentScore = (playerID: number, score: number) => {
    players.map((player) => {
      if (player.id == playerID) {
        player.score = score;
      }
    });
    setDefaultScore(0);
  };

  const calculateTotal = (playerID: number): number => {
    const foundPlayer = players.find((player) => playerID === player.id);
    if (foundPlayer) {
      const totalScore = foundPlayer.history?.reduce(
        (sum, entry) => sum + entry.score,
        0
      );
      return totalScore || 0;
    }
    return 0;
  };

  return (
    <React.Fragment>
      <TableRow sx={{ borderBottom: 2 }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          {row.player}
        </TableCell>
        <TableCell align="right">
          <input
            type="number"
            placeholder=""
            className="input input-bordered input-sm w-14 max-w-xs"
            // defaultValue={defaultScore}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              updateCurrentScore(props.playerID, e.currentTarget.valueAsNumber)
            }
          />
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          <input
            type="number"
            placeholder=""
            className="input input-sm w-16 max-w-xs"
            value={calculateTotal(props.playerID)}
            disabled
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ padding: 0, backgroundColor: "#f0f7ff" }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div>
              <Box>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Round</TableCell>
                      <TableCell align="right">Score</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {players.map((player) => {
                      if (player.id == props.playerID) {
                        return player.history?.map((historyRow) => (
                          <TableRow key={historyRow.round}>
                            <TableCell component="th" scope="row">
                              {historyRow.round}
                            </TableCell>
                            <TableCell align="right">
                              <input
                                type="number"
                                placeholder=""
                                className="input input-bordered input-xs w-14 max-w-xs"
                                defaultValue={historyRow.score}
                                disabled
                                // onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                //   changeNames(player.id, e.currentTarget.value)
                                // }
                              />
                            </TableCell>
                          </TableRow>
                        ));
                      }
                    })}
                  </TableBody>
                </Table>
              </Box>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props: { round: number }) {
  const { players, setPlayers } = usePlayerContext();

  // const sortedPlayers = players.sort((a, b) => a.score - b.score);

  const rows = players.map((player) => {
    console.log("player array", players);
    return createData(
      player.name,
      player.score,
      player.history || [],
      player.id
    );
  });

  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: 0 }}
      style={{ maxHeight: "400px", overflowY: "auto", minWidth: 600 }}
    >
      <Table aria-label="collapsible table">
        <TableBody>
          {rows.map((row) => {
            console.log(row.id);
            return (
              <Row
                key={row.id}
                row={row}
                round={props.round}
                playerID={row.id}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
