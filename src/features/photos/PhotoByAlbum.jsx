import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../posts/postsSlice";
import { fetchPhotosByAlbum, getPhotosByAlbum } from "./photosSlice";

const PhotoByAlbum = ({ albumId }) => {
  const status = useSelector((state) => state.photos.status);
  const photos = useSelector((state) => getPhotosByAlbum(state, albumId));
  const dispatch = useDispatch();
  useEffect(() => {
    if (!photos || photos.length === 0) {
      dispatch(fetchPhotosByAlbum(albumId));
    }
  }, [photos, dispatch, albumId, status]);

  if (status !== STATUS.COMPLETED || !photos || photos.length === 0) {
    return;
  }

  const photo = photos[0];
  return <Card.Img variant="top" src={photo.thumbnailUrl} alt={photo.title} />;
};

export { PhotoByAlbum };
