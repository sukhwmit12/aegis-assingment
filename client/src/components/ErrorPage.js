import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <h2>Page not found</h2>
      <p>
        <Link to="/"> Go to Login!</Link>
      </p>
    </>
  );
};

export default ErrorPage;
