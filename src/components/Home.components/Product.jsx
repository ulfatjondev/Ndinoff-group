import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../store/product";
import { createOrder } from "../../store/order";
import { Spin, Modal, Input, message as AntMessage } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { MdAddShoppingCart } from "react-icons/md";
import { NavLink } from "react-router-dom";

const { TextArea } = Input;

const Product = () => {
  const uzbFlag =
    "https://res.cloudinary.com/dmgcfv5f4/image/upload/v1742026022/flag_vdivbv.jpg";

  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [phone, setPhone] = useState("+998");
  const [fullname, setFullname] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct());
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
    setFullname("");
    setPhone("+998");
    setUserMessage("");
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!fullname || !phone || !userMessage) {
      AntMessage.error("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    setBtnLoading(true);
    try {
      await dispatch(
        createOrder({
          fullname,
          phone_number: phone,
          message: userMessage,
          pill_id: selectedProduct?.id,
        })
      ).unwrap();

      AntMessage.success("Buyurtma muvaffaqiyatli yuborildi!");
      setIsModalVisible(false);
      setFullname("");
      setPhone("+998");
      setUserMessage("");
    } catch {
      AntMessage.error("Buyurtma yuborishda xatolik yuz berdi!");
    } finally {
      setBtnLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  if (status === "failed" || (status === "succeeded" && products.length === 0)) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-center text-[28px] md:text-[30px] lg:text-[40px] font-[500] mb-10">
          {t("product.name")}
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
          {/* {t("product.body")} */}
        </p>
      </div>

      {/* Products Slider */}
      <Swiper
        slidesPerView={4}
        spaceBetween={25}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        loop
        modules={[Pagination, Autoplay]}
        className="cursor-ew-resize pb-12"
      >
        {products.slice(0, 8).map((product) => (
          <SwiperSlide key={product.id}>
            <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center justify-between h-full">
              <img
                src={product.picture}
                alt={product.name}
                className="w-[150px] h-[120px] object-contain mb-4 group-hover:scale-105 transition-transform"
              />
              <h1 className="text-lg font-semibold text-center mb-2 line-clamp-1">
                {i18n.language === "uz"
                  ? product.name_uz
                  : i18n.language === "ru"
                  ? product.name_ru
                  : product.name_en}
              </h1>
              <p className="text-gray-600 mb-3">
                <span className="font-medium">{t("product.price")}: </span>
                <span className="font-semibold">{product.price}</span>{" "}
                {t("product.sena")}
              </p>

              <div className="flex gap-3 w-full justify-center mt-auto">
                <button
                  onClick={() => showModal(product)}
                  className="bg-[#354f52] text-[#f2ce9a] font-medium py-2 rounded-lg transition-all px-10"
                >
                  {t("purchase.purchase")}
                </button>
                {!cartItems.includes(product.id) && (
                  <button
                    className="bg-[#354f52] p-2 rounded-lg flex items-center justify-center transition-all"
                    onClick={() => handleCart(product.id)}
                  >
                    <MdAddShoppingCart className="text-[22px] text-[#f2ce9a]" />
                  </button>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* See more */}
      <div className="flex justify-center mt-10">
        <NavLink
          to="/product"
          className="text-center btn btn-card"
        >
          {t("Global.more")}
        </NavLink>
      </div>

      {/* Modal — untouched */}
      <Modal open={isModalVisible} onCancel={handleCancel} footer={null} width={900} centered>
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
                <strong>{t("product.price")}:</strong> {selectedProduct.price} {t("product.productSena")}
              </p>
              <p className="w-[90%] text-gray-600 line-clamp-3">
                {i18n.language === "uz"
                  ? selectedProduct.body_uz
                  : i18n.language === "ru"
                  ? selectedProduct.body_ru
                  : selectedProduct.body_en
                }
              </p>
            </div>
          )}
          <div className="w-[500px] max-md:w-[80vw] flex flex-col items-center justify-center rounded-lg">
            <h1 className="text-center font-medium text-[25px] mb-3">
              {t("purchase.purchase")}
            </h1>
            <form
              onSubmit={handleOrderSubmit}
              className="w-full flex flex-col items-center gap-3"
            >
              <Input
                placeholder={t("register.name")}
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="text-[17px]"
              />
              <Input
                value={phone}
                onChange={handlePhoneChange}
                className="text-[17px]"
                prefix={<img src={uzbFlag} alt="UZB" className="w-7 h-5 rounded-sm" />}
              />
              <TextArea
                placeholder={t("register.message")}
                rows={4}
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                className="text-[17px]"
              />
              <button
                type="submit"
                className="w-full bg-[#354f52] text-[#EECB98] font-medium rounded-md px-12 mt-2 py-2"
              >
                {btnLoading ? <LoadingOutlined spin /> : t("register.button")}
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Product;