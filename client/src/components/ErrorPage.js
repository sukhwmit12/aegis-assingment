import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h2>Page not found</h2>
      <p>
        <Link to="/"> Go to Login!</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
