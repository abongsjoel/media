import { useEffect } from "react";
import { useSelector } from "react-redux";

import { addUser, fetchUsers } from "../store/";
import Skeleton from "./Skeleton";
import Button from "./Button";
import useThunk from "../hooks/use-thunk";
import UsersListItem from "./UsersListItem";

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUsers, creatingUsersError] = useThunk(addUser);

  const { data } = useSelector((rootState) => rootState.users);

  const handleAddUser = () => {
    doCreateUser();
  };

  const content = isLoadingUsers ? (
    <Skeleton times={6} className="h-10 w-full" />
  ) : loadingUsersError ? (
    <div>Error Fetching Data...</div>
  ) : (
    data.map((user) => <UsersListItem key={user.id} user={user} />)
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
