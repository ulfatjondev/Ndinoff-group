import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import about from "../../assets/pharmacy.webp"

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-gradient-to-b from-[#f0faffe8] to-white py-1">
      <h1 className="text-center text-[28px] md:text-[30px] lg:text-[40px] font-[500] mt-12 my-10">
        {t("AboutComponents.heading")}
      </h1>
      <div className="container mx-auto flex max-lg:flex-col-reverse justify-between items-center gap-10 mb-20 max-md:px-4">
        <div className="lg:w-1/2 w-full">
          <div className="p-4 flex flex-col items-start justify-center gap-6 text-[#002940]">
            <h1 className="text-[25px] md:text-[50px] lg:text-[64px] font-bold  md:leading-[56  px] lg:leading-[80px]">
              {t("AboutComponents.title")}
            </h1>
            <p className="text-[16px] md:text-[18px] lg:text-[18px]">
              {t("AboutComponents.description")}
            </p>
            <NavLink to={"/about"} className="btn">
              {t("Global.button")}
            </NavLink>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex justify-end">
          <img 
            src={about} 
            alt="" 
            className="w-full lg:w-[80%] md:rounded-3xl rounded-lg shadow-[0_8px_25px_rgba(0,0,0,0.15)]"
          />
        </div>
      </div>
    </div>
  );
};

export default About;