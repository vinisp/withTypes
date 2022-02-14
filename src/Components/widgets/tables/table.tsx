import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

interface Column {
  id:
    | "trap"
    | "galgo"
    | "sexo"
    | "peso"
    | "firstPlace"
    | "win"
    | "classe"
    | "speed"
    | "winsNaTrap"
    | "placed"
    | "split"
    | "cansa"
    | "recupera"
    | "lastTime"
    | "timesMedia"
    | "rbt"
    | "brt";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "trap", label: "Trap", minWidth: 15 },
  { id: "galgo", label: "Galgo", minWidth: 20 },
  {
    id: "sexo",
    label: "Sexo",
    minWidth: 5,
    align: "right",
  },
  {
    id: "peso",
    label: "Peso",
    minWidth: 20,
    align: "right",
    format: (value: number) => value.toLocaleString("pt-BR"),
  },
  {
    id: "firstPlace",
    label: "Prob 1st",
    minWidth: 5,
    align: "right",
  },
  {
    id: "win",
    label: "Win",
    minWidth: 5,
    align: "right",
  },
  {
    id: "classe",
    label: "Class",
    minWidth: 5,
    align: "center",
  },
  {
    id: "speed",
    label: "Velocidade",
    minWidth: 15,
    align: "center",
  },
  {
    id: "winsNaTrap",
    label: "Wins (Na trap)",
    minWidth: 15,
    align: "center",
  },
  {
    id: "placed",
    label: "Placed (Na trap)",
    minWidth: 15,
    align: "center",
  },
  {
    id: "split",
    label: "Split",
    minWidth: 15,
    align: "center",
  },
  {
    id: "cansa",
    label: "Cansa",
    minWidth: 15,
    align: "center",
  },
  {
    id: "recupera",
    label: "Recupera",
    minWidth: 15,
    align: "center",
  },
  {
    id: "lastTime",
    label: "Último tempo",
    minWidth: 15,
    align: "center",
  },
  {
    id: "timesMedia",
    label: "Média de tempo",
    minWidth: 15,
    align: "center",
  },
  {
    id: "rbt",
    label: "RBT (m/s)",
    minWidth: 15,
    align: "center",
  },
  {
    id: "brt",
    label: "BRT",
    minWidth: 15,
    align: "center",
  },
];

interface Data {
  trap: string;
  galgo: string;
  sexo: string;
  peso: number;
  firstPlace: string;
  win: string;
  classe: string;
  speed: string;
  winsNaTrap: string;
  placed: string;
  split: string;
  cansa: string;
  recupera: string;
  lastTime: string;
  timesMedia: string;
  rbt: string;
  brt: string;
}

function createData(
  trap: string,
  galgo: string,
  sexo: string,
  peso: number,
  firstPlace: string,
  win: string,
  classe: string,
  speed: string,
  winsNaTrap: string,
  placed: string,
  split: string,
  cansa: string,
  recupera: string,
  lastTime: string,
  timesMedia: string,
  rbt: string,
  brt: string
): Data {
  return {
    trap,
    galgo,
    sexo,
    peso,
    firstPlace,
    win,
    classe,
    speed,
    winsNaTrap,
    placed,
    split,
    cansa,
    recupera,
    lastTime,
    timesMedia,
    rbt,
    brt,
  };
}

// Não usar a palavra class ou Class, pois é uma palavra reservada

//Mock Data
const rows = [
  createData(
    "1",
    "Jaguar Blake",
    "M",
    32,
    "10%",
    "7%",
    "-",
    "75.9 ³",
    "45%",
    "25%",
    "35%",
    "78%",
    "0%",
    "29s",
    "28.2s",
    "17.04",
    "44.7"
  ),
];

const TableSizes = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },

  [theme.breakpoints.up("md")]: {
    height: "auto",
    width: "100%",
  },
  [theme.breakpoints.up("lg")]: {
    height: "auto",
    width: "100%",
    border: "0",
  },
}));

function TableResults() {
  return (
    <>
      <TableSizes>
        <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 0 }}>
          <TableContainer
            sx={{
              maxHeight: "auto",
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.galgo}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TableSizes>
    </>
  );
}

export default TableResults;
