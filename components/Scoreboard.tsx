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

export function createData(player: string, score: number) {
  return {
    player,
    score,
    history: [
      {
        round: 1,
        score: 0,
      },
      {
        round: 2,
        score: 12,
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
        <TableCell component="th" scope="row">
          {row.player}
        </TableCell>
        <TableCell align="right">
          <input
            type="text"
            placeholder=""
            className="input input-bordered input-sm w-14 max-w-xs"
            defaultValue={row.score}
            // onChange={(e: React.FormEvent<HTMLInputElement>) =>
            //   changeNames(player.id, e.currentTarget.value)
            // }
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
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.round}>
                        <TableCell component="th" scope="row">
                          {historyRow.round}
                        </TableCell>
                        <TableCell align="right">
                          <input
                            type="text"
                            placeholder=""
                            className="input input-bordered input-xs w-14 max-w-xs"
                            defaultValue={historyRow.score}
                            // onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            //   changeNames(player.id, e.currentTarget.value)
                            // }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
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
  const rows = players.map((player) => createData(player.name, player.score));

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
      <Table aria-label="collapsible table">
        <TableBody>
          {rows.map((row) => (
            <Row key={row.player} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
