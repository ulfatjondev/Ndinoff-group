import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../store/product";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { MdAddShoppingCart } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Product = () => {
  const [cartItems, setCartItems] = useState(() =>
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct());
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
        <h1 className="text-center text-[28px] md:text-[30px] lg:text-[40px] font-[500] text-[#002940] mb-10">
          {t("product.name")}
        </h1>
      </div>

      {/* Products Slider */}
      <Swiper
        slidesPerView={4}
        spaceBetween={25}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
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
            <div className="border p-5 rounded-md flex justify-center items-center flex-col bg-white hover:shadow-lg transition-all duration-300">
              <img
                src={product.picture}
                alt={product.name}
                className="w-[150px] h-[120px] object-contain hover:scale-110 transition-all duration-300 mb-3"
              />

              {/* Mahsulot nomi */}
              <h1 className="text-[21px] font-semibold text-center text-[#002940] mb-2">
                {i18n.language === "uz"
                  ? product.name_uz
                  : i18n.language === "ru"
                  ? product.name_ru
                  : product.name_en}
              </h1>

              {/* Narx yoki chegirma */}
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

              {/* Tugmalar */}
              <div className="flex items-center gap-3 mt-3">
                <NavLink
                  to={`/datapage/${product.id}`}
                  className="bg-[#354f52] text-[#f2ce9a] px-10 py-2 rounded-md text-[16px] transition-all hover:bg-[#2b3d3f]"
                >
                  {t("Global.button")}
                </NavLink>

                {!cartItems.includes(product.id) && (
                  <button
                    className="bg-[#354f52] rounded-md px-2 py-2 hover:bg-[#2b3d3f]"
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
    </div>
  );
};

export default Product;