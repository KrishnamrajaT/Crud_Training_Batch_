import React, { useState } from "react";
import Box from "@mui/material/Box";
import UserDataTable from "./userDataTable";
import CreateUser from "./createUser";

export default function UserLayout() {
  let [isRefresh, setIsRefresh] = React.useState(false);
  return (
    <Box
      display={"flex"}
      justifyContent={"space-evenly"}
      alignContent={"center"}
    >
      <Box>
        <UserDataTable isRefresh={isRefresh} setIsRefresh={setIsRefresh}/>
      </Box>
      <Box>
        <CreateUser isRefresh={isRefresh} setIsRefresh={setIsRefresh} />
      </Box>
    </Box>
  );
}
