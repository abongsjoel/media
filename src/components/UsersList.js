import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, fetchUsers } from "../store/";
import Skeleton from "./Skeleton";
import Button from "./Button";

function UsersList() {
  const dispatch = useDispatch();

  const { isLoading, data, error } = useSelector(
    (rootState) => rootState.users
  );

  const handleAddUser = () => {
    dispatch(addUser());
  };

  const renderedUsers = data.map((user) => (
    <div key={user.id} className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        {user.name}
      </div>
    </div>
  ));

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return isLoading ? (
    <Skeleton times={6} className="h-10 w-full" />
  ) : error ? (
    <p>Error Fetching Data...</p>
  ) : (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button onClick={handleAddUser}>+ Add User</Button>
      </div>
      {renderedUsers}
    </div>
  );
}

export default UsersList;
