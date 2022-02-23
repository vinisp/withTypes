import { useParams } from "react-router-dom";
import dataDog from "../backendFake/dogListFoda.json";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export function RacePage() {
  const { idRace } = useParams<any>();
  const selectRace = dataDog.filter((e) => e.raceId === idRace);
  return (
    <>
      <Typography color="white">
        {selectRace.map((e) => (
          <>
            Track: {e.trackName}
            Race Date: {e.raceDate}
          </>
        ))}
      </Typography>
      <TableContainer component={Paper}>
        {selectRace.map((row) => (
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Dog/Box</StyledTableCell>
                <StyledTableCell align="right">Career</StyledTableCell>
                <StyledTableCell align="right">
                  Track e Distance
                </StyledTableCell>
                <StyledTableCell align="right">Best T/D</StyledTableCell>
                <StyledTableCell align="right">Rating</StyledTableCell>
                <StyledTableCell align="right">GR Price</StyledTableCell>
                <StyledTableCell align="right">Best Odds</StyledTableCell>
                <StyledTableCell align="right">Flucs</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow key={row.raceId}>
                <StyledTableCell component="th" scope="row">
                  {row.dogName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.raceStatus}
                </StyledTableCell>
                <StyledTableCell align="right">{row.distance}</StyledTableCell>
                <StyledTableCell align="right">{row.raceType}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.prizeSterling}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        ))}
      </TableContainer>
    </>
  );
}
