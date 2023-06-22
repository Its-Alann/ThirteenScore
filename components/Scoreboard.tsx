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

// Creates the rows in the Scoreboard
function Row(props: {
  row: ReturnType<typeof createData>;
  round: number;
  playerID: number;
}) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const { players, setPlayers } = usePlayerContext();
  const [defaultScore, setDefaultScore] = React.useState(0);

  // Takes the Player[] and finds the correct player for the specified row. Once the player is found
  // his current score is updated to whatever is inputted by the user
  const updateCurrentScore = (playerID: number, score: number) => {
    players.map((player) => {
      if (player.id == playerID) {
        player.score = score;
      }
    });
    setDefaultScore(0);
  };

  // Calculates the total score for each player. Similar to updateCurrentScore() it will find the correct
  // player and then sum the score property in the history[]
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
        {/* This is for the dropdown arrow that shows the history for each player*/}
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        {/* This shows the names of each player */}
        <TableCell component="th" scope="row" align="right">
          {row.player}
        </TableCell>

        {/* This is where the user inputs the score the player got in the round */}
        <TableCell align="right">
          <input
            type="number"
            placeholder=""
            className="input input-bordered input-sm w-14 max-w-xs"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              updateCurrentScore(props.playerID, e.currentTarget.valueAsNumber)
            }
          />
        </TableCell>

        {/* This shows the total score of the player */}
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

      {/* These are the rows found in the dropdown */}
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

                  {/* Goes through the Players[] and find each player. If the playerID of the row (props.playerID) 
                  matches the playerID found in the Players[], we will load the history of this player */}
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

  // This needs to be continued, its to sort the players based on their score. Probably will need to
  // add a new field in the Player context
  // const sortedPlayers = players.sort((a, b) => a.score - b.score);

  // Creates the rows for the table
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
