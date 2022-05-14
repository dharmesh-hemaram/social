import { Alert, Col, Row, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AlbumsByUser } from "../albums/AlbumsByUser";
import { PostsByUser } from "../posts/PostsByUser";
import { TodosByUser } from "../todo/TodosByUser";
import { selectUserById } from "./usersSlice";

const SingleUserView = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, userId));
  if (!user) {
    return <Alert variant="warning">No User Found</Alert>;
  }
  return (
    <>
      <h3>{user.name}</h3>
      <Row>
        <Col>
          <address>
            {user.address.street}
            <br />
            {user.address.suite}
            <br />
            {user.address.city}
            <br />
            {user.address.zipcode}
          </address>
        </Col>
        <Col>
          <a href={`tel:${user.phone}`}>{user.phone}</a>
          <br />
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </Col>
      </Row>
      <Tabs defaultActiveKey="todos" className="mt-3">
        <Tab eventKey="todos" title="Todos" className="py-5">
          <TodosByUser userId={user.id} />
        </Tab>
        <Tab eventKey="posts" title="Posts" className="py-5">
          <PostsByUser userId={user.id} />
        </Tab>
        <Tab eventKey="albums" title="Albums" className="py-5">
          <AlbumsByUser userId={user.id} />
        </Tab>
      </Tabs>
    </>
  );
};
export { SingleUserView };
