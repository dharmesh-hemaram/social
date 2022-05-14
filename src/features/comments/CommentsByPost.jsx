import { useEffect } from "react";
import { Badge, Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../posts/postsSlice";
import { fetchCommentsByPost, getCommentsByPost } from "./commentsSlice";

const CommentsByPost = ({ postId }) => {
  const status = useSelector((state) => state.comments.status);
  const comments = useSelector((state) => getCommentsByPost(state, postId));
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === STATUS.IDLE && (!comments || comments.length === 0)) {
      dispatch(fetchCommentsByPost(postId));
    }
  }, [comments, dispatch, postId, status]);

  if (!comments || comments.length === 0) {
    return;
  }
  return (
    <Card.Footer>
      <ListGroup>
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id}>
            <div className="ms-2 me-auto">
              <div className="fw-bold">{comment.email}</div>
              {comment.body}
            </div>
            <Badge bg="primary" pill>
              {comment.name}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card.Footer>
  );
};

export { CommentsByPost };
