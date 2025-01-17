import { GoTrashcan } from "react-icons/go";

import useThunk from "../hooks/use-thunk";
import Button from "./Button";
import { removeUser } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";

function UsersListItem({ user }) {
  const [doRemoveUser, isRemovingUsers, removingUsersError] =
    useThunk(removeUser);

  const handleRemoveUser = (user) => {
    doRemoveUser(user);
  };

  const header = (
    <>
      <Button
        className="mr-3"
        loading={isRemovingUsers}
        onClick={() => handleRemoveUser(user)}
      >
        <GoTrashcan />
      </Button>
      {removingUsersError && <div>Error deleting user</div>}
      {user.name}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;
