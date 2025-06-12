import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import MediaNavbar from "../components/navbar/MediaNavbar";
import { RxPinTop } from "react-icons/rx";
import { FaTelegram, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { t } from "i18next";

const RouterLayout = () => {
  const location = useLocation();

  // Ushbu sahifalarda Navbar va Footer ko'rinmasin
  const hiddenRoutes = ["/login", "/register", "/admin", "/404"];
  const hideLayout = hiddenRoutes.includes(location.pathname);

  const logo = "https://res.cloudinary.com/dmgcfv5f4/image/upload/v1742026078/logo_zqcq7u.png";
  const year = new Date().getFullYear();

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
        <>
          <footer className="bg-[#2F3E46] py-10">
            <div className="container mx-auto flex items-center flex-col lg:flex-row gap-10 justify-between">
              <div className="flex items-center max-md:flex-col gap-10 max-md:gap-5">
                <img src={logo} alt="logo" className="w-[350px] max-md:w-[250px]" />
                <div className="flex flex-col gap-3">
                  <p className="text-[#fff] font-bold">{t("Global.footer_title")}</p>
                  <p className="text-[#fff]">{t("Global.footer_month")}</p>
                  <p className="text-[#fff]">{t("Global.footer_date")}</p>
                </div>
              </div>
              <a
                href="#navbar"
                className="text-[20px] p-4 border text-[#fff] rounded-full"
              >
                <RxPinTop />
              </a>
              <div className="flex flex-col gap-3">
                <p className="text-[#fff] text-md">{t('Global.location')}</p>
                <ul className="flex justify-between items-center flex-wrap gap-5 text-[#fff]">
                  <li><a href="https://t.me/NDINOFFGROUP" target="_black" className="text-[23px]"><FaTelegram /></a></li>
                  <li><a href="https://instagram.com/NDINOFFGROUP" target="_black" className="text-[23px]"><FaInstagram /></a></li>
                  <li><a href="ndinoffgroup@mail.ru" target="_black" className="text-[25px]"><MdEmail /></a></li>
                  <li>
                    <a href={`tel: +998781138113`} className="text-[20px] flex items-center gap-2">
                      <IoCall /> +998 (78) 113-81-13
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="container mx-auto border-t-2 my-5">
              <p className="text-center text-[#fff] pt-[50px]">
                © {year} {t('Global.footer-footer')}
              </p>
            </div>
          </footer>

          <a 
            href="https://t.me/NDINOFFGROUP" 
            className="fixed bottom-10 max-md:bottom-8 right-10 max-md:right-5 z-50 bg-white shadow-xl rounded-[50%] cursor-pointer flex items-center justify-center border border-gray-200 p-5 max-md:p-3"
            target="_blank"
          > 
            <FaTelegramPlane className="text-4xl max-md:text-3xl text-blue-400"/>
          </a>
        </>
      )}
    </>
  );
};

export default RouterLayout;