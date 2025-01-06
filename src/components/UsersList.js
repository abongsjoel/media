import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/";

function UsersList() {
  const dispatch = useDispatch();

  const loading = useSelector((rootState) => rootState.users.isLoading);
  const users = useSelector((rootState) => rootState.users.data);
  const error = useSelector((rootState) => rootState.users.error);
  console.log({ loading, users, error });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return <div>UsersList</div>;
}

export default UsersList;
