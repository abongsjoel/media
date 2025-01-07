import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import Skeleton from "./Skeleton";

function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();
  console.log({ results });

  let content;
  if (isLoading) {
    content = <Skeleton times={3} />;
  } else if (error) {
    content = <div>{error.message}</div>;
  } else {
    content = data.map((album) => {
      const header = <div>{album.title}</div>;

      return (
        <ExpandablePanel key={album.id} header={header}>
          List of photos in the album
        </ExpandablePanel>
      );
    });
  }

  const handleAddAlbum = (user) => {
    addAlbum(user);
  };

  return (
    <div>
      <div>
        Albums for {user.name}{" "}
        <Button onClick={() => handleAddAlbum(user)}>+ Add Album</Button>
      </div>

      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
