import { faker } from "@faker-js/faker";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pause } from "./fetchUsers";

const addUser = createAsyncThunk("users/add", async (user) => {
  const response = await axios.post("http://localhost:3005/userss", {
    name: faker.name.fullName(),
  });

  await pause(1000);

  return response.data;
});

export { addUser };
