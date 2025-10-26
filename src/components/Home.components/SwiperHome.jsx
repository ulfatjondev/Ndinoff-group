import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getSwiper } from "../../store/swiper_pills";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const decodeHTML = (html) => {
  const parser = new DOMParser();
  const decoded = parser.parseFromString(html, "text/html");
  return decoded.body.textContent || "";
};

const SwiperHome = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { swiper, status } = useSelector((state) => state.swiper);
  const [activeIndex, setActiveIndex] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    dispatch(getSwiper());
  }, [dispatch]);

  if (status === "loading")
    return (
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );

  if (status === "failed") return "";

  if ((status === "succeeded" || status === "idle") && swiper.length === 0) {
    return null;
  }

  const slideVariants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: [0.45, 0, 0.55, 1] },
    },
    exit: {
      opacity: 0,
      scale: 1.04,
      transition: { duration: 0.7, ease: [0.45, 0, 0.55, 1] },
    },
  };

  return (
    <Swiper
      pagination={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[Pagination, Autoplay]}
      onSlideChange={(swiperInstance) => {
        setActiveIndex(swiperInstance.realIndex);
        setFirstLoad(false);
      }}
      className="container mx-auto h-[70vh] min-h-[70vh] md:h-[60vh] lg:h-[70vh] rounded-3xl md:my-14 relative overflow-hidden"
    >
      {swiper?.map((item, index) => (
        <SwiperSlide key={item.id}>
          <div className="w-full h-full flex justify-center items-center p-2 relative">
            <AnimatePresence mode="wait">
              {activeIndex === index && (
                <motion.div
                  key={index + (firstLoad ? "-noanim" : "-anim")}
                  variants={slideVariants}
                  initial={firstLoad ? false : "hidden"}
                  animate="visible"
                  exit="exit"
                  className="flex justify-between items-center w-full max-md:flex-col-reverse gap-10"
                >
                  {/* Chap taraf */}
                  <div className="w-[50%] max-md:w-full text-center md:text-left">
                    <h1 className="text-[20px] md:text-[32px] lg:text-[64px] font-semibold leading-[35px] md:leading-[45px] lg:leading-[72px] text-[#002940]">
                      {i18n.language === "uz"
                        ? item.name_uz
                        : i18n.language === "ru"
                        ? item.name_ru
                        : item.name_en}
                    </h1>
                    <p className="py-5 text-[14px] md:text-[18px] leading-relaxed text-[#002940]">
                      {decodeHTML(
                        i18n.language === "uz"
                          ? item.body_uz
                          : i18n.language === "ru"
                          ? item.body_ru
                          : item.body_en
                      )}
                    </p>
                    <NavLink to={`/datapage/${item.id}`}>
                      <button className="btn">{t("Global.button")}</button>
                    </NavLink>
                  </div>

                  {/* O‘ng taraf */}
                  <div className="max-md:w-full w-[45%] md:w-[40%] overflow-hidden rounded-xl flex justify-center">
                    <motion.img
                      src={item.picture}
                      alt=""
                      className="lg:max-h-[600px] w-full object-cover rounded-xl"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperHome;