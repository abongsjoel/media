import React from "react";

export default function PhotoListItem(photo) {
  return (
    <div className="relative m-2">
      <img className="h-20 w-20" src={photo.url} alt="random photo" />
    </div>
  );
}
