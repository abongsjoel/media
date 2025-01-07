import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import AlbumListItem from "./AlbumListItem";
import Button from "./Button";
import Skeleton from "./Skeleton";

function AlbumsList({ user }) {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  let content;
  if (isFetching) {
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
    <div>
      <div className="m-2 flex flex-row items-center justify-between ">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button
          loading={results.isLoading}
          onClick={() => handleAddAlbum(user)}
        >
          + Add Album
        </Button>
      </div>

      <div className="bg-gray-100">{content}</div>
    </div>
  );
}

export default AlbumsList;
