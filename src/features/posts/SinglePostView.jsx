import { useEffect } from "react";
import { Alert, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CommentsByPost } from "../comments/CommentsByPost";
import { Author } from "../users/Author";
import { fetchPostById, selectPostById } from "./postsSlice";

const SinglePostView = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, postId));
  const dispatch = useDispatch();
  useEffect(() => {
    if (!post) {
      dispatch(fetchPostById(postId));
    }
  }, [postId, dispatch, post]);

  if (!post) {
    return <Alert variant="error">Post not found</Alert>;
  }

  return (
    <>
      <Card className="mb-2">
        <Card.Body>
          <Card.Title className="text-capitalize">{post.title}</Card.Title>
          <Card.Text>{post.body}</Card.Text>
          {post.userId && <Author userId={post.userId} />}
        </Card.Body>
      </Card>
      <CommentsByPost postId={post.id} />
    </>
  );
};

export { SinglePostView };
