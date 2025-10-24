import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getDiscount } from "../../store/discount";
import { Spin, Modal, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { MdAddShoppingCart } from "react-icons/md";

const { TextArea } = Input;

const Discounts = () => {
  const uzbFlag =
    "https://res.cloudinary.com/dmgcfv5f4/image/upload/v1742026022/flag_vdivbv.jpg";
  const [cartItems, setCartItems] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [phone, setPhone] = useState("+998");

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { discount, status } = useSelector((state) => state.discount);

  useEffect(() => {
    dispatch(getDiscount());
  }, [dispatch]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value.startsWith("+998") && value.length <= 13) {
      setPhone(value);
    }
  };

  const handleCart = (id) => {
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.includes(id)
        ? prevCartItems.filter((itemId) => itemId !== id)
        : [...prevCartItems, id];

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const showModal = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (status === "loading") {
    return (
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  if (status === "failed" || !discount || discount.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg my-10">
        {t("news.null")}
      </p>
    );
  }

  return (
    <div className="container mx-auto mb-10 max-md:px-4">
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
        {discount.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="w-[90%] border p-5 rounded-md flex justify-center items-center flex-col hover:shadow-lg transition-all duration-300 bg-white">
              <img
                src={product.picture}
                className="w-[150px] h-[150px] object-contain mb-3"
                alt={product.name}
              />
              <h1 className="text-lg font-semibold mb-1 text-center">
                {i18n.language === "uz"
                  ? product.name_uz
                  : i18n.language === "ru"
                  ? product.name_ru
                  : product.name_en}
              </h1>
              <p className="text-gray-700 mb-1 text-center">
                <span className="font-medium">{t("product.price")}: </span>
                {product.price} {t("product.sena")}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <button
                  className="btn px-10 py-2 text-[15px] rounded-md"
                  onClick={() => showModal(product)}
                >
                  {t("purchase.purchase")}
                </button>
                <button
                  className={`bg-[#354f52] rounded-md px-2 py-2 ${
                    cartItems.includes(product.id) ? "hidden" : ""
                  }`}
                  onClick={() => handleCart(product.id)}
                >
                  <MdAddShoppingCart className="text-[22px] text-[#f2ce9a]" />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={900}
        centered
      >
        <div className="flex max-md:flex-col items-center justify-center gap-10 p-10">
          {selectedProduct && (
            <div className="w-[450px] max-md:w-[80vw] flex flex-col items-center justify-center">
              <img
                src={selectedProduct.picture}
                alt={selectedProduct.name}
                className="w-[60%] object-cover"
              />
              <h1 className="mt-3 text-[20px] font-[500]">
                {i18n.language === "uz"
                  ? selectedProduct.name_uz
                  : i18n.language === "ru"
                  ? selectedProduct.name_ru
                  : selectedProduct.name_en}
              </h1>
              <p className="py-2">
                <strong>{t("product.price")}:</strong> {selectedProduct.price}{" "}
                {t("product.productSena")}
              </p>
            </div>
          )}
          <div className="w-[500px] max-md:w-[80vw] flex flex-col items-center justify-center rounded-lg">
            <h1 className="text-center font-medium text-[25px] mb-3">
              {t("register.title", "Ro‘yxatdan o‘tish")}
            </h1>
            <form className="w-full flex flex-col items-center gap-3">
              <Input
                placeholder={t("register.name", "Ism")}
                className="text-[17px]"
              />
              <Input
                value={phone}
                onChange={handlePhoneChange}
                className="text-[17px]"
                prefix={
                  <img src={uzbFlag} alt="UZB" className="w-7 h-5 rounded-sm" />
                }
              />
              <TextArea
                placeholder={t("register.message", "Xabar")}
                rows={4}
                className="text-[17px]"
              />
              <button className="w-full bg-[#354f52] text-[#EECB98] font-medium rounded-md px-12 mt-2 py-2">
                {t("register.button", "Yuborish")}
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Discounts;