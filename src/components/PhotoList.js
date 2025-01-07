import { useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import Button from "./Button";
import PhotoListItem from "./PhotoListItem";
import Skeleton from "./Skeleton";

function PhotoList({ album }) {
  const { data, error, isFetching } = useFetchPhotosQuery(album);
  console.log({ data, error, isFetching });

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
      <div className="mx-8 flex flex-row flex-wrap justify-center">
        {isFetching ? (
          <Skeleton className="h-8 w-8" times={4} />
        ) : error ? (
          <div>{error.message}</div>
        ) : (
          data.map((photo) => <PhotoListItem key={photo.id} photo={photo} />)
        )}
      </div>
    </div>
  );
}

export default PhotoList;
