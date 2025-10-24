import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
import { getPartner } from "../../store/partners";
import { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { Spin } from "antd";

const AboutComponents = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { partner, status } = useSelector((state) => state.partner);
  const [state, setState] = useState(false);

  useEffect(() => {
    dispatch(getPartner());
    setState(true);
  }, [dispatch]);

  if (status === "loading")
    return (
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );

  if (status === "failed") return null;

  return (
    <>
      <div className="AboutComponents">
        <div className="container mx-auto">
          <div className="p-4 w-[50%] md:w-[40%] lg:w-[25vw] flex flex-col items-center justify-center gap-6 h-[50vh] md:h-[70vh] lg:h-[70vh] text-[#002940]">
            <h1 className="text-[25px] md:text-[50px] lg:text-[64px] font-bold md:leading-[56px] lg:leading-[80px]">
              {t("AboutComponents.title")}
            </h1>
            <p className="text-[16px] md:text-[18px] lg:text-[18px]">
              {t("AboutComponents.description")}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex justify-between items-center gap-10 my-10 flex-wrap">
          <div className="w-[100%] text-center">
            <h1 className="text-[28px] md:text-[32px] lg:text-[42px]">
              {t("AboutComponents.main_title")}
            </h1>
          </div>
          <div className="w-[90%] mx-auto text-justify">
            <p className="text-[16px] md:text-[18px] lg:text-[20px]">
              {t("AboutComponents.main_description")}
            </p>
          </div>
        </div>

        <div className="flex justify-between flex-col md:flex-row lg:flex-row items-center gap-10 py-[60px] border-t border-b">
          <div className="text-center text-[#2F3E46]">
            <h1>{t("AboutComponents.number_title")}</h1>
            <h1 className="text-[50px] font-bold text-[#F2CE9A]">
              {state && <CountUp start={0} end={7} duration={2} />}
              {"+"}
            </h1>
          </div>
          <div className="text-center text-[#2F3E46]">
            <h1>{t("AboutComponents.number_title1")}</h1>
            <h1 className="text-[50px] font-bold text-[#F2CE9A]">
              {state && <CountUp start={0} end={4000} duration={2} />}
              {"+"}
            </h1>
          </div>
          <div className="text-center text-[#2F3E46]">
            <h1>{t("AboutComponents.number_title2")}</h1>
            <h1 className="text-[50px] font-bold text-[#F2CE9A]">
              {state && <CountUp start={0} end={350} duration={2} />}
              {"+"}
            </h1>
          </div>
        </div>
        {/* Hamkorlar bo‘limi faqat partner bor bo‘lsa ko‘rinadi */}
        {partner?.length > 0 && (
          <div className="my-[10px] md:my-[50px] lg:my-[100px]">
            <h1 className="text-center text-[25px] md:text-[30px] lg:text-[50px] text-[#2F3E46] my-[20px]">
              {t("AboutComponents.hamkorlar")}
            </h1>

            {/* ✅ Swiper slider qo‘shildi */}
            <div className="my-10 p-5">
              <Swiper
                spaceBetween={30}
                loop={true}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  320: { slidesPerView: 2 },
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 5 },
                  1280: { slidesPerView: 5 },
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
              >
                {partner.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="flex justify-center items-center mb-10">
                      <div className="w-[100px] md:w-[120px] lg:w-[180px] flex justify-center items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                        <img
                          src={item.picture}
                          alt={`partner-${item.id}`}
                          className="object-contain w-full h-[60px] md:h-[80px] lg:h-[100px] hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AboutComponents;