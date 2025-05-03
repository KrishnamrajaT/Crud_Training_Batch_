import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import UsersTable from "./UsersTable";
import CreateUser from "./createUser";
import UpdateUser from "./UpdateUser";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export const Layout = () => {
  let [isEdit, setIsEdit] = useState(false);
  let [updateUserId, setUpdateUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [isRefresh, setIsRefesh] = useState(false);



  const fetchUserData = () => {
    let URL = "http://localhost:8080/user";
    axios
      .get(URL)
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, [isRefresh]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={8}>
          <UsersTable setIsEdit={setIsEdit} users={users} fetchUserData={fetchUserData} setUpdateUserId={setUpdateUserId} />
        </Grid>
        <Grid size={4}>
          {/* <Box marginTop={}> */}
          {isEdit ? <UpdateUser updateUserId={updateUserId} setIsRefesh={setIsRefesh}  setIsEdit={setIsEdit} /> : <CreateUser setIsRefesh={setIsRefesh} />}
          {/* </Box> */}
        </Grid>
      </Grid>
    </Box>
  );
};
