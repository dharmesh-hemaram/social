import { useEffect } from "react";
import { Button, ButtonGroup, ListGroup, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFilter,
  fetchTodosByUser,
  getTodosByUser,
  TODOS_FILTER,
} from "./todosSlice";

const TodosByUser = ({ userId }) => {
  const filter = useSelector((state) => state.todos.filter);
  const todos = useSelector((state) => getTodosByUser(state, userId));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodosByUser(userId));
  }, [userId, dispatch]);

  if (!todos || todos.length === 0) {
    return;
  }

  return (
    <>
      <div className="d-flex justify-content-end">
        <ButtonGroup className="mb-2">
          {Object.keys(TODOS_FILTER).map((key) => (
            <Button
              key={key}
              active={key === filter}
              onClick={() => dispatch(changeFilter(key))}
            >
              {key}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem
            key={todo.id}
            className={todo.completed ? "text-decoration-line-through" : ""}
          >
            {todo.title}
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

export { TodosByUser };
