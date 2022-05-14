import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotosByAlbum, getPhotosByAlbum } from "./photosSlice";

const PhotoByAlbum = ({ albumId }) => {
  const photos = useSelector((state) => getPhotosByAlbum(state, albumId));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhotosByAlbum(albumId));
  }, [dispatch, albumId]);

  if (!photos || photos.length === 0) {
    return;
  }

  const photo = photos[0];
  return <Card.Img variant="top" src={photo.thumbnailUrl} alt={photo.title} />;
};

export { PhotoByAlbum };
