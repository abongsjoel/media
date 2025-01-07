import { GoTrashcan } from "react-icons/go";

import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { useRemoveAlbumMutation } from "../store";

function AlbumListItem({ album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const handleDelete = () => {
    removeAlbum(album);
  };

  const header = (
    <>
      <Button
        className="mr-2"
        loading={results.isLoading}
        onClick={handleDelete}
      >
        <GoTrashcan />
      </Button>
      {album.title}
    </>
  );

  return (
    <ExpandablePanel key={album.id} header={header}>
      List of photos in the album
    </ExpandablePanel>
  );
}

export default AlbumListItem;
