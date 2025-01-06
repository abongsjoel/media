import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { addUser, fetchUsers, removeUser } from "../store/";
import Skeleton from "./Skeleton";
import Button from "./Button";
import useThunk from "../hooks/use-thunk";

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUsers, creatingUsersError] = useThunk(addUser);
  const [doRemoveUser, isRemovingUsers, removingUsersError] =
    useThunk(removeUser);

  const [clickedUser, setClickedUser] = useState(null);

  const { data } = useSelector((rootState) => rootState.users);

  const handleAddUser = () => {
    doCreateUser();
  };

  const handleRemoveUser = (user) => {
    setClickedUser(user.id);
    doRemoveUser(user);
  };

  const content = isLoadingUsers ? (
    <Skeleton times={6} className="h-10 w-full" />
  ) : loadingUsersError ? (
    <div>Error Fetching Data...</div>
  ) : (
    data.map((user) => (
      <div key={user.id} className="mb-2 border rounded">
        <Button
          loading={user.id === clickedUser && isRemovingUsers}
          onClick={() => handleRemoveUser(user)}
        >
          X
        </Button>
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    ))
  );

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>

        <Button loading={isCreatingUsers} onClick={handleAddUser}>
          + Add User
        </Button>

        {creatingUsersError && "Error Creating User"}
      </div>
      {content}
    </div>
  );
}

export default UsersList;
