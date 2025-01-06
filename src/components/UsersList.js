import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/";
import Skeleton from "./Skeleton";

function UsersList() {
  const dispatch = useDispatch();

  const { isLoading, data, error } = useSelector(
    (rootState) => rootState.users
  );
  console.log({ isLoading, data, error });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return isLoading ? (
    <Skeleton />
  ) : (
    <div>
      <Skeleton />
    </div>
  );
}

export default UsersList;
