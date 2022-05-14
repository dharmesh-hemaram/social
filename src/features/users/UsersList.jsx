import { Alert, Col, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllUsers } from "./usersSlice";

const UsersList = () => {
  const users = useSelector(selectAllUsers);
  if (!users) {
    return <Alert variant="info">Users not found</Alert>;
  }
  return (
    <>
      <h1>Users</h1>
      <Row md={4}>
        <Col>
          <ListGroup>
            {users.map((user) => (
              <ListGroup.Item key={user.id}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export { UsersList };
