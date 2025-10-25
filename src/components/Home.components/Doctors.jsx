// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDoctor } from "../../store/doctors";
import { useEffect } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Doctors = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { doctor, status } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(getDoctor());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-center text-[28px] md:text-[30px] lg:text-[40px] font-[500] text-[#002940] my-6">
        {t("doctors.mainInfo")}
      </h1>

      {/* Agar doktorlar yo'q bo'lsa — sarlavha qoladi, ammo shu yerda xabar chiqadi */}
      {(!doctor || doctor.length === 0) ? (
        <div className="py-10">
          <p className="text-center text-gray-500 text-[18px]">
            {i18n.language === "uz"
              ? "Hozircha doktorlar yo‘q"
              : i18n.language === "ru"
              ? "Докторов пока нет"
              : "No doctors available yet"}
          </p>
        </div>
      ) : (
        <>
          <Swiper
            slidesPerView={3}
            spaceBetween={12}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Pagination, Autoplay]}
            breakpoints={{
              0: {
                slidesPerView: 1.3,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 12,
              },
            }}
            className="cursor-ew-resize"
          >
            {doctor?.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="flex flex-col items-center border rounded-2xl p-4 bg-white hover:shadow-xl transition-all duration-300 mb-10">
                  <img
                    src={item.picture}
                    alt={item.fullname}
                    className="rounded-xl w-[200px] h-[250px] object-cover mb-4"
                  />
                  <h3 className="text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-center text-[#002940] mb-2">
                    {item.fullname}
                  </h3>

                  <div className="w-full text-center">
                    <p className="text-[#002940] mb-1 text-[14px] md:text-[15px]">
                      <span className="font-semibold">{t("doctors.direction")}: </span>
                      {i18n.language === "uz"
                        ? item.direction_uz
                        : i18n.language === "ru"
                        ? item.direction_ru
                        : item.direction_en}
                    </p>

                    <p className="text-[#002940] mb-3 text-[14px] md:text-[15px]">
                      <span className="font-semibold">{t("doctors.call")}: </span>
                      <a href={`tel:${item.call}`}>
                        {item.call}
                      </a>
                    </p>

                    {/* Ma'lumot chiqmasin — faqat batafsil tugma */}
                    <div className="w-full flex justify-center">
                      <NavLink
                        to={`/doctorpage/${item.id}`}
                        className="inline-block px-10 py-2 rounded-lg border bg-[#354F52] text-[#E8CB9E] text-sm md:text-base transition-colors"
                      >
                        {t("Global.button")}
                      </NavLink>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="w-full flex justify-center mt-6">
            <NavLink to={"/alldoctors"} className="text-center btn btn-card">
              {t("Global.more")}
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default Doctors;