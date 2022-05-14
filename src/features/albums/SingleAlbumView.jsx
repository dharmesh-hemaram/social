import { useEffect } from "react";
import { Alert, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Error } from "../../app/Error";
import { PhotosByAlbum } from "../photos/PhotosByAlbum";
import { STATUS } from "../posts/postsSlice";
import { Author } from "../users/Author";
import { fetchAlbumById, selectAlbumById } from "./albumsSlice";

const SingleAlbumView = () => {
  const { albumId } = useParams();
  const status = useSelector((state) => state.albums.status);
  const error = useSelector((state) => state.albums.error);
  const album = useSelector((state) => selectAlbumById(state, albumId));
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === STATUS.IDLE && !album) {
      dispatch(fetchAlbumById(albumId));
    }
  }, [status, albumId, album, dispatch]);

  if (status === STATUS.LOADING) {
    return <Spinner />;
  }
  if (status === STATUS.ERROR) {
    return <Error error={error} />;
  }
  if (!album) {
    return <Alert variant="info">No Album found by {albumId} id</Alert>;
  }

  return (
    <Card style={{ width: "18rem" }}>
      <PhotosByAlbum albumId={album.id} />
      <Card.Body>
        <Card.Title>{album.title}</Card.Title>
        <Author userId={album.userId} />
      </Card.Body>
    </Card>
  );
};

export { SingleAlbumView };
