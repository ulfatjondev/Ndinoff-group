import { useDispatch, useSelector } from "react-redux";
import { getAchievement } from "../../store/achievements";
import { Spin, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Discounts from "../discounts";

const NewComponents = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { achievements, status } = useSelector((state) => state.achievement);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    dispatch(getAchievement());
  }, [dispatch]);

  if (status === "loading")
    return (
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );

  if (status === "failed")
    return (
      <p className="text-center text-red-500 text-lg mt-10">
        {t("error.loading_failed") || "Ma'lumotni yuklashda xatolik yuz berdi"}
      </p>
    );

  const handleCardClick = (img) => {
    setSelectedImage(img);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-center my-10 text-[28px] md:text-[30px] lg:text-[40px] font-[500]">
          {t("news.new") || "Yangiliklar"}
        </h1>
        {achievements && achievements.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 px-5 pb-16">
            {achievements.map((item, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(item.picture)}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.picture}
                    alt={
                      i18n.language === "uz"
                        ? item.title_uz
                        : i18n.language === "ru"
                        ? item.title_ru
                        : item.title_en
                    }
                    className="w-full h-[230px] rounded-lg object-cover transform group-hover:scale-110 transition-all duration-500"
                  />
                </div>
                <div className="p-5">
                  <h1 className="text-lg font-medium line-clamp-3">
                    {i18n.language === "uz"
                      ? item.title_uz
                      : i18n.language === "ru"
                      ? item.title_ru
                      : item.title_en}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-xl my-10">
            {t("news.not_found") || "Yangiliklar mavjud emas"}
          </p>
        )}
      </div>

      <div className="container mx-auto border-t pt-24">
        <h1 className="text-center text-[28px] md:text-[30px] lg:text-[40px] font-[500] mb-10">
          {t("news.discount")}
        </h1>
        <Discounts />
      </div>

      {/* MODAL RASM */}
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        centered
        width={700}
      >
        <img
          src={selectedImage}
          alt="Achievement"
          className="w-full h-auto rounded-lg object-contain"
        />
      </Modal>
    </>
  );
};

export default NewComponents;