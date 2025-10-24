import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { getDoctor } from "../../store/doctors";
import { useEffect } from "react";
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import doc from "../../assets/nurse.png";

const AllDoctors = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { doctor, status } = useSelector((state) => state.doctor);

  useEffect(() => {   
      dispatch(getDoctor());
    }, [dispatch]);
  
    if (status === "loading") return 

    <div className="absolute top-[50%] left-[50%] translate-x-[-50%]">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>

    if ((status === "succeeded" || status === "idle") && doctor.length === 0) {
      return <div className="min-h-[60vh] text-gray-500 flex items-center justify-center">
                <h1>{t("doctor_page.not_doctor")}</h1>
             </div>
    }

  return (
    <>
      <div className="container mx-auto my-28 max-md:px-4">
        <div className="flex justify-between item-center flex-col-reverse md:flex-col-reverse lg:flex-row border rounded-2xl bg-blue-100">
          <div className="w-[100%] md:w-[100%] lg:w-[50%] p-10">
            <h1 className="text-[20px] md:text-[35px] lg:text-[40px] text-center md:text-center lg:text-left">
              {t("doctor_page.title")}
            </h1>
            <p className="my-5 text-justify md:text-justify lg:text-left">
              {t("doctor_page.desc_1")}
            </p>
            <p className="text-justify md:text-justify lg:text-left">
              {t("doctor_page.desc_2")}
            </p>
            <p className=" my-5 text-justify md:text-justify lg:text-left">
              {t("doctor_page.desc_3")}
            </p>
            <p className="text-justify md:text-justify lg:text-left">
              {t("doctor_page.desc_4")}
            </p>
          </div>
          <div>
            <img src={doc} alt="" />
          </div>
        </div>
        <h1 className="text-center my-20 text-[40px]">Doktorlar</h1>
        <div className="flex justify-center text-center flex-wrap gap-5 lg:gap-20 my-20">
          {doctor?.map((item) => (
            <div
              className="flex items-center flex-col border p-3 rounded-lg w-[80%] md:w-[45%] lg:w-[25%]"
              key={item.id}
            >
              <img src={item.picture} alt="" className="rounded-t-lg w-[200px] h-[250px]"/>
              <h3 className="text-[27px] my-3">{item.fullname}</h3>
              <div>
                <h3 className="">
                  <span className="font-[600]">{t("doctors.direction")}: </span>
                  {
                    i18n.language === "uz"
                    ? item.direction_uz
                    : i18n.language === "ru"
                    ? item.direction_ru
                    : item.direction_en
                  }
                </h3>
                <a href={item.call}>
                  <span className="font-[600] my-3">{t("doctors.call")}: </span>
                  {item.call}
                </a>
                <p>
                  <span className="font-[600]">{t("doctors.info")}: </span>
                  {
                    i18n.language === "uz"
                    ? item.body_uz
                    : i18n.language === "ru"
                    ? item.body_ru
                    : item.body_en
                  }
                </p>
                <NavLink to={`/doctorpage/${item.id}`} className="btn btn_card">
                  {t("Global.button")}
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllDoctors;
