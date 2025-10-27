import { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const DoctorPage = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const _api = import.meta.env.VITE_API;

  const [doctor, setDoctor] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    // sahifaga kirilganda yuqoriga chiqish
    window.scrollTo(0, 0);

    const fetchDoctor = async () => {
      try {
        setStatus("loading");
        const res = await axios.get(`${_api}/doctors/${id}/`);
        setDoctor(res.data);
        setStatus("succeeded");
      } catch (error) {
        console.error("Error fetching doctor:", error);
        setStatus("failed");
      }
    };

    fetchDoctor();
  }, [id, _api]);

  if (status === "loading")
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );

  if (status === "failed" || !doctor) return "";

  // rasm URL to'g'rilash
  const doctorImage = doctor.picture?.startsWith("http")
    ? doctor.picture
    : `${_api}${doctor.picture}`;

  return (
    <div className="container mx-auto max-md:px-4">
      {/* === DOCTOR INFO === */}
      <div className="flex justify-between items-center max-md:flex-col-reverse max-md:gap-10 py-20">
        <div className="max-md:w-full w-[50%] md:w-[50%] lg:w-[40%]">
          <h1 className="text-[20px] md:text-[25px] lg:text-[40px] text-[#002940]">
            {doctor.fullname}
          </h1>
          <p className="md:leading-7 lg:leading-10 text-[10px] md:text-[18px] text-[#002940] my-5">
            {i18n.language === "uz"
              ? doctor.body_uz
              : i18n.language === "ru"
              ? doctor.body_ru
              : doctor.body_en}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="btn text-[14px] md:text-[16px] lg:text-[20px] md:font-medium"
          >
            {t("Global.back")}
          </button>
        </div>

        <div className="max-md:w-full w-[45%] md:w-[40%] lg:w-[30%]">
          <img src={doctorImage} alt={doctor.fullname} className="w-full rounded-xl" />
        </div>
      </div>

      {/* === RECOMMENDED PILLS SECTION === */}
      <div className="my-20">
        <h1 className="text-center text-[28px] md:text-[30px] lg:text-[40px] font-[500] text-[#002940] mb-10">
          {t("doctors.recommended_pills")}
        </h1>

        {doctor.advices && doctor.advices.length > 0 ? (
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1 },
              480: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            loop
            modules={[Pagination, Autoplay]}
            className="cursor-ew-resize h-[40vh]"
          >
            {doctor.advices.map((product) => {
              const productImage = product.picture?.startsWith("http")
                ? product.picture
                : `${_api}${product.picture}`;
              return (
                <SwiperSlide key={product.id}>
                  <div className="w-[90%] border p-5 rounded-md flex justify-center items-center flex-col hover:shadow-lg transition-all duration-300 bg-white">
                    <img
                      src={productImage}
                      className="w-[150px] h-[150px] object-contain mb-3"
                      alt={product.name_en}
                    />
                    <h1 className="text-lg font-semibold text-center text-[#002940] mb-1">
                      {i18n.language === "uz"
                        ? product.name_uz
                        : i18n.language === "ru"
                        ? product.name_ru
                        : product.name_en}
                    </h1>
                    {product.discount_price ? (
                      <div className="flex flex-col items-center">
                        <p className="text-gray-400 line-through text-[15px]">
                          {product.price} {t("product.sena")}
                        </p>
                        <p className="text-[18px] font-medium text-[#002940]">
                          {product.discount_price} {t("product.sena")}
                        </p>
                      </div>
                    ) : (
                      <p className="text-[18px] text-[#002940]">
                        <span className="font-medium">{t("product.price")}: </span>
                        <span>{product.price} </span>
                        <span>{t("product.sena")}</span>
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      <NavLink
                        to={`/datapage/${product.id}`}
                        className="btn px-10 py-2 text-[15px] rounded-md"
                      >
                        {t("Global.button")}
                      </NavLink>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            {t("news.null")}
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorPage;