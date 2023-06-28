import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header title="Project-Flights" />
      <>
        <Outlet />
      </>
      <Footer />
    </>
  );
};

export default Layout;
