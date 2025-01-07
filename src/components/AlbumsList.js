import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import AlbumListItem from "./AlbumListItem";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import Skeleton from "./Skeleton";

function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();
  console.log({ results });

  let content;
  if (isLoading) {
    content = <Skeleton times={3} className="h-10 w-full" />;
  } else if (error) {
    content = <div>{error.message}</div>;
  } else {
    content = data.map((album) => (
      <AlbumListItem key={album.id} album={album} />
    ));
  }

  const handleAddAlbum = (user) => {
    addAlbum(user);
  };

  return (
    <div className="bg-blue-100">
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button
          loading={results.isLoading}
          onClick={() => handleAddAlbum(user)}
        >
          + Add Album
        </Button>
      </div>

      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
