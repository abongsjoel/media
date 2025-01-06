import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pause } from "./fetchUsers";

const removeUser = createAsyncThunk("user/remove", async (user) => {
  const response = await axios.delete(`http://localhost:3005/users/${user.id}`);

  await pause(1000);

  return user;
});

export { removeUser };
