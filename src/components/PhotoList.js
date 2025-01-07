import { useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import Button from "./Button";
import PhotoListItem from "./PhotoListItem";

function PhotoList({ album }) {
  const { data, error, isFetching } = useFetchPhotosQuery(album);
  console.log({ data });
  //   const results = useFetchPhotosQuery(album);

  const [addPhoto, addPhotoResults] = useAddPhotoMutation();
  console.log({ addPhotoResults });

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  return (
    <div className="bg-blue-100">
      <div className="m-2 flex flex-row items-center justify-between">
        <h1 className="text-lg font-bold">Photos in {album.title}</h1>
        <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>
      <PhotoListItem />
    </div>
  );
}

export default PhotoList;
