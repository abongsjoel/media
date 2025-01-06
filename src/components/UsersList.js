import { useEffect } from "react";
import { useSelector } from "react-redux";

import { addUser, fetchUsers } from "../store/";
import Skeleton from "./Skeleton";
import Button from "./Button";
import useThunk from "../hooks/use-thunk";

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUsers, creatingUsersError] = useThunk(addUser);

  const { data } = useSelector((rootState) => rootState.users);

  const handleAddUser = () => {
    doCreateUser();
  };

  const renderedUsers = data.map((user) => (
    <div key={user.id} className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        {user.name}
      </div>
    </div>
  ));

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  return isLoadingUsers ? (
    <Skeleton times={6} className="h-10 w-full" />
  ) : loadingUsersError ? (
    <p>Error Fetching Data...</p>
  ) : (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>

        <Button loading={isCreatingUsers} onClick={handleAddUser}>
          + Add User
        </Button>

        {creatingUsersError && "Error Creating User"}
      </div>
      {renderedUsers}
    </div>
  );
}

export default UsersList;
