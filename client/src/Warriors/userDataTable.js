import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function UserDataTable({ setIsRefresh, isRefresh }) {
  let [usersData, setUsersData] = React.useState(null);
  let [isFetchUsersData, setIsFetchUsersData] = React.useState(false);

  let baseUrl = "https://training-batch-crud-server.vercel.app/user";

  const fetchUserData = () => {
    axios
      .get(baseUrl)
      .then((res) => {
        setUsersData(res.data);
        console.log(res.data, "usersData");
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = (id) => {
    let baseUrl = `https://training-batch-crud-server.vercel.app/user/delete/${id}`;
    axios
      .delete(baseUrl)
      .then((res) => {
        setIsRefresh(!isRefresh);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    fetchUserData();
  }, [isRefresh]);


  return (
    <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
      <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>City</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersData?.length > 0 ? (
            usersData?.map((item, ind) => (
              <StyledTableRow key={ind}>
                <StyledTableCell component="th" scope="row">
                  {item.username}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.city}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.email}
                </StyledTableCell>
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" color="success">
                    Update
                  </Button>
                  <Button
                    onClick={() => deleteUser(item._id)}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </Stack>
              </StyledTableRow>
            ))
          ) : (
            <h1 style={{textAlign:"center", marginLeft:"60px"}}>No users found</h1>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
