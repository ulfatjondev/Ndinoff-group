import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { FaInstagram, FaTelegram, FaTelegramPlane } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RxPinTop } from "react-icons/rx";

const Footer = () => {
  const logo =
    "https://res.cloudinary.com/dmgcfv5f4/image/upload/v1742026078/logo_zqcq7u.png";
  const year = new Date().getFullYear();
  const { t } = useTranslation();
  const _api = import.meta.env.VITE_API;

  const [socials, setSocials] = useState(null);

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const res = await axios.get(`${_api}/social_links/`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        if (Array.isArray(res.data) && res.data.length > 0) {
          setSocials(res.data[0]);
        }
      } catch (error) {
        console.error("Socials API error:", error);
      }
    };

    fetchSocials();
  }, [_api]);

  return (
    <>
      <footer className="bg-[#2F3E46] py-10">
        <div className="container mx-auto flex items-center flex-col lg:flex-row gap-10 justify-between max-md:px-4">
          <div className="flex items-center max-md:flex-col gap-10 max-md:gap-5">
            <img src={logo} alt="logo" className="w-[350px] max-md:w-[250px]" />
            <div className="flex flex-col max-md:items-center gap-3">
              <p className="text-[#fff] font-bold">
                {t("Global.footer_title")}
              </p>
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

          {socials && (
            <div className="flex flex-col gap-5">
              <p className="text-[#fff] text-md max-md:text-center">
                {t("Global.location")}
              </p>
              <ul className="flex justify-start items-center max-md:justify-center flex-wrap gap-8 text-[#fff]">
                {socials.telegram_url && (
                  <li>
                    <a
                      href={socials.telegram_url}
                      target="_blank"
                      className="text-[23px]"
                    >
                      <FaTelegram size={25}/>
                    </a>
                  </li>
                )}
                {socials.instagram_url && (
                  <li>
                    <a
                      href={socials.instagram_url}
                      target="_blank"
                      className="text-[23px]"
                    >
                      <FaInstagram size={25}/>
                    </a>
                  </li>
                )}
                {socials.mail_url && (
                  <li>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${socials.mail_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[25px]"
                    >
                      <MdEmail size={25}/>
                    </a>
                  </li>
                )}
                {socials.phone_number && (
                  <li>
                    <a
                      href={`tel:${socials.phone_number}`}
                      className="text-[20px] flex items-center gap-2"
                    >
                      {socials.phone_number}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="container mx-auto border-t-2 my-5">
          <p className="text-center text-[#fff] pt-[50px]">
            © {year} {t("Global.footer-footer")}
          </p>
        </div>
      </footer>

      {socials?.telegram_url && (
        <a
          href={socials.telegram_url}
          className="fixed bottom-10 max-md:bottom-8 right-10 max-md:right-5 z-50 bg-white shadow-xl rounded-[50%] cursor-pointer flex items-center justify-center border border-gray-200 p-5 max-md:p-3"
          target="_blank"
        >
          <FaTelegramPlane className="text-4xl max-md:text-3xl text-blue-400" />
        </a>
      )}
    </>
  );
};

export default Footer;