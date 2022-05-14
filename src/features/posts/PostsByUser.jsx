import { useEffect } from "react";
import { Alert, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PostExcrete } from "./PostsList";
import { fetchPostsByUserId, selectPostsByUser } from "./postsSlice";

const PostsByUser = ({ userId }) => {
  const posts = useSelector((state) => selectPostsByUser(state, userId));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!posts || posts.length === 0) {
      dispatch(fetchPostsByUserId(userId));
    }
  }, [userId, dispatch, posts]);
  if (!posts || posts.length === 0) {
    return <Alert variant="info">Nothing posted by this user</Alert>;
  }

  return <Row>{posts.map(PostExcrete)}</Row>;
};

export { PostsByUser };
