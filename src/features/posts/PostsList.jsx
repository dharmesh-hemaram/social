import { useEffect } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Error } from "../../app/Error";
import { fetchPosts, selectAllPosts, STATUS } from "./postsSlice";

export const PostExcrete = (post) => (
  <Col key={post.id} xs={1} md={4} className="mb-4">
    <Card>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.body}</Card.Text>
        <Link to={`/posts/${post.id}`}>View Post</Link>
      </Card.Body>
    </Card>
  </Col>
);

const PostsList = () => {
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);
  let content = "";
  if (status === STATUS.LOADING) {
    content = <Spinner animation="border" />;
  } else if (status === STATUS.COMPLETED) {
    content = <Row>{posts.map(PostExcrete)}</Row>;
  } else if (status === STATUS.ERROR) {
    return <Error error={error} />;
  }

  return (
    <>
      <h1>Posts</h1>
      {content}
    </>
  );
};

export { PostsList };
