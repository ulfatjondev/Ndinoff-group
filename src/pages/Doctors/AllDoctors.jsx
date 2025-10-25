import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { getDoctor } from "../../store/doctors";
import { useEffect } from "react";
import { Spin } from "antd";
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

  if (status === "loading")
    return (
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );

  return (
    <>
      <div className="container mx-auto my-28 max-md:px-4">
        <div className="flex justify-between item-center flex-col-reverse md:flex-col-reverse lg:flex-row border rounded-2xl bg-blue-100">
          <div className="w-[100%] md:w-[100%] lg:w-[50%] p-10">
            <h1 className="text-[20px] md:text-[35px] lg:text-[40px] text-center md:text-center lg:text-left text-[#002940]">
              {t("doctor_page.title")}
            </h1>
            <p className="my-5 text-justify md:text-justify lg:text-left text-[#002940]">
              {t("doctor_page.desc_1")}
            </p>
            <p className="text-justify md:text-justify lg:text-left text-[#002940]">
              {t("doctor_page.desc_2")}
            </p>
            <p className=" my-5 text-justify md:text-justify lg:text-left text-[#002940]">
              {t("doctor_page.desc_3")}
            </p>
            <p className="text-justify md:text-justify lg:text-left text-[#002940]">
              {t("doctor_page.desc_4")}
            </p>
          </div>
          <div>
            <img src={doc} alt="" />
          </div>
        </div>

        <h1 className="text-center text-[40px] text-[#002940] mt-24">{t("navbar.doc")}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-10 px-4 md:px-8 lg:px-12">
          {doctor && doctor.length > 0 ? (
            doctor.map((item) => (
              <NavLink
                to={`/doctorpage/${item.id}`}
                key={item.id}
                className="flex flex-col items-center border rounded-2xl p-4 bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={item.picture}
                  alt={item.fullname}
                  className="rounded-xl w-[200px] h-[250px] object-cover mb-4"
                />
                <h3 className="text-[22px] font-semibold text-center text-[#002940] mb-2">
                  {item.fullname}
                </h3>
                <div className="text-left w-full">
                  <p className="text-[#002940] mb-1">
                    <span className="font-semibold">
                      {t("doctors.direction")}:{" "}
                    </span>
                    {i18n.language === "uz"
                      ? item.direction_uz
                      : i18n.language === "ru"
                      ? item.direction_ru
                      : item.direction_en}
                  </p>
                  <p className="text-[#002940] mb-1">
                    <span className="font-semibold">{t("doctors.call")}: </span>
                    {item.call}
                  </p>
                  <p className="text-[#002940] line-clamp-3">
                    <span className="font-semibold">{t("doctors.info")}: </span>
                    {i18n.language === "uz"
                      ? item.body_uz
                      : i18n.language === "ru"
                      ? item.body_ru
                      : item.body_en}
                  </p>
                </div>
              </NavLink>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-[20px]">
              {t("doctor_page.not_doctor")}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllDoctors;