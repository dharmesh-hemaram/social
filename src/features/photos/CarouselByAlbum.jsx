import { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotosByAlbum, getPhotosByAlbum } from "./photosSlice";

const CarouselByAlbum = ({ albumId }) => {
  const photos = useSelector((state) => getPhotosByAlbum(state, albumId));
  const dispatch = useDispatch();
  useEffect(() => {
    if (!photos || photos.length === 0) {
      dispatch(fetchPhotosByAlbum(albumId));
    }
  }, [photos, dispatch, albumId]);

  if (!photos || photos.length === 0) {
    return;
  }

  return (
    <Carousel>
      {photos.map((photo) => (
        <Carousel.Item key={photo.id}>
          <img className="d-block w-100" src={photo.url} alt={photo.title} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export { CarouselByAlbum };
