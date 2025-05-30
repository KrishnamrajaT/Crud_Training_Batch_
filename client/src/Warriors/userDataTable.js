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
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataPending,
  fetchDataSuccess,
  setUsersDate,
  refresh,
} from "../store/usersReducer";

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

export default function UserDataTable({ setIsEdit, setUpdateUserId }) {
  const dispacth = useDispatch();

  let getStoreData = useSelector((state) => state.userReducer.usersDate);
  let loading = useSelector((state) => state.userReducer.loading);
  let isRefresh = useSelector((state) => state.userReducer.isRefresh);

  let baseUrl = "https://training-batch-crud-server.vercel.app/user";

  const fetchUsers = () => {
    dispacth(fetchDataPending());
    axios
      .get(baseUrl)
      .then((res) => {
        dispacth(fetchDataSuccess());
        dispacth(setUsersDate(res.data));
      })
      .catch((err) => {
        dispacth(fetchDataSuccess());
        console.log(err);
      });
  };

  const deleteUser = (id) => {
    let baseUrl = `https://training-batch-crud-server.vercel.app/user/delete/${id}`;
    axios
      .delete(baseUrl)
      .then((res) => {
        dispacth(refresh());
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    fetchUsers();
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
          {loading ? (
            <Box sx={{ width: 300 }}>
              <Skeleton animation="wave" height={50} width={800} />
              <Skeleton animation="wave" height={50} width={800} />
              <Skeleton animation="wave" height={50} width={800} />
              <Skeleton animation="wave" height={50} width={800} />
              <Skeleton animation="wave" height={50} width={800} />
              <Skeleton animation="wave" height={50} width={800} />
            </Box>
          ) : (
            <>
              {getStoreData?.length > 0 ? (
                getStoreData?.map((item, ind) => (
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
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setUpdateUserId(item._id);
                          setIsEdit(true);
                        }}
                        color="success"
                      >
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
                <h1 style={{ textAlign: "center", marginLeft: "60px" }}>
                  No users found
                </h1>
              )}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
