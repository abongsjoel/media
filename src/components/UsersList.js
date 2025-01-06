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
    <Skeleton times={6} className="h-10 w-full" />
  ) : (
    <div>
      <Skeleton times={60} className="h-5 w-full" />
    </div>
  );
}

export default UsersList;
