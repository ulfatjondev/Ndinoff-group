import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getDiscount } from "../../store/discount";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { MdAddShoppingCart } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Discounts = () => {
  const [cartItems, setCartItems] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
  );

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { discount, status } = useSelector((state) => state.discount);

  useEffect(() => {
    dispatch(getDiscount());
  }, [dispatch]);

  const handleCart = (id) => {
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.includes(id)
        ? prevCartItems.filter((itemId) => itemId !== id)
        : [...prevCartItems, id];

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
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
    </div>
  );
};

export default Discounts;
