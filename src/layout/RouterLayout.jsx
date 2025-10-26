import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import MediaNavbar from "../components/navbar/MediaNavbar";
import Footer from "../components/footer/Footer";

const RouterLayout = () => {
  const location = useLocation();
  const hiddenRoutes = ["/login", "/register", "/admin", "/404"];
  const hideLayout = hiddenRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && (
        <header>
          <div className="hidden lg:block">
            <Navbar />
          </div>
          <div className="lg:hidden">
            <MediaNavbar />
          </div>
        </header>
      )}
      <main>
        <Outlet />
      </main>
      {!hideLayout && (
        <Footer />
      )}
    </>
  );
};

export default RouterLayout;