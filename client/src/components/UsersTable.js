import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditBtn_BackDrop from "./EditBackDrop";

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

const UsersTable = ({ setIsEdit, setUpdateUserId, users, fetchUserData}) => {

  const handleDelete = (id) => {
    // Handle delete logic here
    let URL = `http://localhost:8080/user/delete/${id}`;
    axios
      .delete(URL)
      .then(() => {
        console.log("Deleted");
        fetchUserData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEdit = (id) => {
    setIsEdit(true);
    setUpdateUserId(id);
    console.log(id);
  };
  return (
    <TableContainer sx={{ minHeight: "95vh" }} component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow fullWidth>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Address</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <StyledTableRow key={user._id}>
              <StyledTableCell>{user.username}</StyledTableCell>
              <StyledTableCell>{user.email}</StyledTableCell>
              <StyledTableCell>{user.city}</StyledTableCell>
              <StyledTableCell>
                <Button
                  variant="contained"
                  sx={{ marginRight: "5px" }}
                  onClick={() => handleEdit(user._id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
