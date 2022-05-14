import { Alert, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AlbumsByUser } from "../albums/AlbumsByUser";
import { PostsByUser } from "../posts/PostsByUser";
import { selectUserById } from "./usersSlice";

const SingleUserView = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, userId));
  if (!user) {
    return <Alert variant="warning">No User Found</Alert>;
  }
  return (
    <>
      <h1>{user.name}</h1>
      <Badge>{user.phone}</Badge>
      <address>
        {user.address.street}
        <br />
        {user.address.suite}
        <br />
        {user.address.city}
        <br />
        {user.address.zipcode}
      </address>
      <a href={`mailto:${user.email}`}>{user.email}</a>
      <h3>Posts</h3>
      <PostsByUser userId={user.id} />
      <h3>Albums</h3>
      <AlbumsByUser userId={user.id} />
    </>
  );
};
export { SingleUserView };
