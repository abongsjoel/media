import { useFetchPhotosQuery } from "../store";
import PhotoListItem from "./PhotoListItem";

function PhotoList({ album }) {
  //   const { data, error, isFetching } = useFetchPhotosQuery(album);
  //   console.log({ data });
  const results = useFetchPhotosQuery(album);
  console.log({ results });

  return (
    <div className="bg-blue-100">
      <PhotoListItem />
    </div>
  );
}

export default PhotoList;
