import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/";
import Skeleton from "./Skeleton";

function UsersList() {
  const dispatch = useDispatch();

  const { isLoading, data, error } = useSelector(
    (rootState) => rootState.users
  );

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
    <div>{renderedUsers}</div>
  );
}

export default UsersList;
