import React, { useState } from "react";
import Box from "@mui/material/Box";
import UserDataTable from "./userDataTable";
import CreateUser from "./createUser";
import UpdateUser from "./updateUser";

export default function UserLayout() {
  let [isRefresh, setIsRefresh] = React.useState(false);
  let [isEdit, setIsEdit] = React.useState(false);
  let [updateUserId, setUpdateUserId] = React.useState(null);
  
  return (
    <Box
      display={"flex"}
      justifyContent={"space-evenly"}
      alignContent={"center"}
    >
      <Box>
        <UserDataTable
          setIsEdit={setIsEdit}
          isRefresh={isRefresh}
          setIsRefresh={setIsRefresh}
          setUpdateUserId={setUpdateUserId}
        />
      </Box>
      <Box>
        {isEdit ? (
          <UpdateUser updateUserId={updateUserId} isRefresh={isRefresh} setIsRefresh={setIsRefresh} />
        ) : (
          <CreateUser isRefresh={isRefresh} setIsRefresh={setIsRefresh} />
        )}
      </Box>
    </Box>
  );
}
