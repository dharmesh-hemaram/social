import { useEffect } from "react";
import { Alert, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AlbumExcerpt } from "./AlbumsList";
import { fetchAlbumsByUserId, getAlbumsByUser } from "./albumsSlice";

const AlbumsByUser = ({ userId }) => {
  const albums = useSelector((state) => getAlbumsByUser(state, userId));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!albums || albums.length === 0) {
      dispatch(fetchAlbumsByUserId(userId));
    }
  }, [userId, dispatch, albums]);

  if (!albums || albums.length === 0) {
    return <Alert variant="info">No albums found for this user</Alert>;
  }

  return (
    <Row>
      {albums.map((album) => (
        <AlbumExcerpt key={album.id} albumId={album.id} />
      ))}
    </Row>
  );
};

export { AlbumsByUser };
