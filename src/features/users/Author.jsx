import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserById } from "./usersSlice";

const Author = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));
  return (
    <Link to={`/users/${userId}`}>{user ? user.name : "Unknown User"}</Link>
  );
};

export { Author };
