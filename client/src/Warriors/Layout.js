import * as React from "react";
import Box from "@mui/material/Box";
import UserDataTable from "./userDataTable";
import CreateUser from "./createUser";

export default function UserLayout() {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-evenly"}
      alignContent={"center"}
    >
      <Box>
        <UserDataTable />
      </Box>
      <Box>
        <CreateUser />
      </Box>
    </Box>
  );
}
