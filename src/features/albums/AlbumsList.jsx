import { useEffect } from "react";
import { Alert, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PhotoByAlbum } from "../photos/PhotoByAlbum";
import { STATUS } from "../posts/postsSlice";
import { fetchAlbums, selectAlbumById, selectAlbumIds } from "./albumsSlice";

export const AlbumExcerpt = ({ albumId }) => {
  const album = useSelector((state) => selectAlbumById(state, albumId));

  return (
    <Col key={album.id}>
      <Link to={`/albums/${album.id}`}>
        <Card>
          <PhotoByAlbum albumId={album.id} />
          <Card.Body>
            <Card.Title>{album.title}</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

const AlbumsList = () => {
  const status = useSelector((state) => state.albums.status);
  const error = useSelector((state) => state.albums.error);
  const albumIds = useSelector(selectAlbumIds);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchAlbums());
    }
  }, [status, dispatch]);

  let content = "";

  if (status === STATUS.LOADING) {
    content = <Spinner />;
  } else if (status === STATUS.ERROR) {
    content = <Alert variant="error">{error}</Alert>;
  } else if (status === STATUS.COMPLETED) {
    content = (
      <Row>
        {albumIds.map((albumId) => {
          return <AlbumExcerpt key={albumId} albumId={albumId} />;
        })}
      </Row>
    );
  }
  return (
    <Container>
      <h1>Albums</h1>
      {content}
    </Container>
  );
};

export { AlbumsList };