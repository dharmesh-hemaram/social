import { Alert } from "react-bootstrap";

const Error = ({ error }) => {
  return <Alert variant="error">{error.message || error}</Alert>;
};

export { Error };
