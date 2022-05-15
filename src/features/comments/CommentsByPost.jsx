import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
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
    <>
      <ListGroup>
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id}>
            <div className="ms-2 me-auto">
              <div className="fw-bold">{comment.name}</div>
              {comment.body}
            </div>
            <a href={`mailti:${comment.email}`} className="ms-2">
              {comment.email}
            </a>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export { CommentsByPost };
