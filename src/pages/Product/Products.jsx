import SwiperHome from "../../components/Home.components/SwiperHome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../store/product";
import { useTranslation } from "react-i18next";
import { MdAddShoppingCart } from "react-icons/md";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { CiSearch } from "react-icons/ci";
import { NavLink } from "react-router-dom";

const Products = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const filteredProducts = products.filter((product) => {
    const lang = i18n.language;

    const categories =
      lang === "uz"
        ? product.categories_uz || []
        : lang === "ru"
        ? product.categories_ru || []
        : product.categories_en || [];

    if (selectedCategory && !categories.includes(selectedCategory))
      return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();

    const texts = [
      lang === "uz" ? product.name_uz : lang === "ru" ? product.name_ru : product.name_en,
      lang === "uz" ? product.body_uz : lang === "ru" ? product.body_ru : product.body_en,
      lang === "uz"
        ? product.information_uz
        : lang === "ru"
        ? product.information_ru
        : product.information_en,
      lang === "uz" ? product.type_uz : lang === "ru" ? product.type_ru : product.type_en,
      ...categories,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return texts.includes(q);
  });

  const allCategoriesSet = new Set();
  products.forEach((product) => {
    const lang = i18n.language;
    const cats =
      lang === "uz"
        ? product.categories_uz || []
        : lang === "ru"
        ? product.categories_ru || []
        : product.categories_en || [];
    cats.forEach((cat) => allCategoriesSet.add(cat));
  });
  const allCategories = Array.from(allCategoriesSet);

  if (status === "loading") {
    return (
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  if (status === "failed") return "";

  return (
    <>
      <SwiperHome />
      <div className="container max-md:w-[90vw] mx-auto mb-20 my-10">
        <div className="flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-5 mt-20 my-10">
          <h1 className="text-[28px] md:text-[30px] lg:text-[40px] font-[500]">
            {t("product.product_title")}
          </h1>
          <div className="flex items-center h-12 border border-gray-300 rounded-md pr-3 gap-1">
            <input
              type="text"
              placeholder={t("product.search")}
              className="outline-none h-full w-full rounded-md p-4"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedCategory("");
              }}
            />
            <CiSearch size={25} className="text-gray-500" />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-4 py-2 rounded-md border transition-all duration-300 ${
              selectedCategory === ""
                ? "bg-[#354f52] text-[#EECB98]"
                : "bg-transparent text-[#354f52] border-[#354f52]"
            }`}
          >
            {t("product.all")}
          </button>
          {allCategories.map((cat, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedCategory(cat);
                setSearchQuery("");
              }}
              className={`px-4 py-2 rounded-md border transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-[#354f52] text-[#EECB98]"
                  : "bg-transparent text-[#354f52] border-[#354f52]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-[20px] text-gray-500 my-20">
            {t("product.no_product")}
          </p>
        ) : (
          <div className="grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-2 max-xl:grid-cols-3 gap-5 md:gap-10 lg:gap-10">
            {filteredProducts.map((product) => (
              <div key={product.id}>
                <div className="border p-5 rounded-md flex justify-center items-center flex-col hover:shadow-lg transition-all duration-300">
                  <img
                    src={product.picture}
                    className="w-[150px] h-[120px] object-contain hover:scale-110 transition-all duration-300"
                    alt={product.name}
                  />
                  <h1 className="text-xl my-2 font-semibold text-center">
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
                      <p className="text-[18px] font-medium">
                        {product.discount_price} {t("product.sena")}
                      </p>
                    </div>
                  ) : (
                    <p className="text-[17px]">
                      <span className="font-medium">{t("product.price")}: </span>
                      <span>{product.price} </span>
                      <span>{t("product.sena")}</span>
                    </p>
                  )}

                  <div className="flex items-center gap-3 mt-3">
                    <NavLink
                      to={`/datapage/${product.id}`}
                      className="btn px-10 py-2 text-[16px] rounded-md"
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
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;