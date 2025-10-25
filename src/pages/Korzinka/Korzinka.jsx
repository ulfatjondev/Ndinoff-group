import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { Input, Spin, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../store/product";

const { TextArea } = Input;

const Korzinka = () => {
  const uzbFlag =
    "https://res.cloudinary.com/dmgcfv5f4/image/upload/v1742026022/flag_vdivbv.jpg";
  const [cartItems, setCartItems] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
  );
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const [cartProducts, setCartProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [phone, setPhone] = useState("+998");

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const filteredProducts = products?.filter((product) =>
      cart.includes(product.id)
    );
    setCartProducts(filteredProducts);
  }, [products]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value.startsWith("+998") && value.length <= 13) {
      setPhone(value);
    }
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = cartItems.filter((itemId) => itemId !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartProducts(cartProducts.filter((product) => product.id !== id));
  };

  const handlePurchase = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  if (status === "failed") return null;

  return (
    <div className="container mx-auto my-20 px-3">
      <h1 className="text-2xl md:text-3xl font-semibold text-center text-[#002940] mb-12">
        {t("cart.title")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10">
        {cartProducts.length > 0 ? (
          cartProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center justify-between text-center border border-gray-100"
            >
              <img
                src={product.picture}
                alt={product.name}
                className="w-[150px] h-[120px] object-contain mb-4 hover:scale-105 transition-transform duration-300"
              />

              <h1 className="text-[21px] font-semibold text-[#002940] mb-2">
                {i18n.language === "uz"
                  ? product.name_uz
                  : i18n.language === "ru"
                  ? product.name_ru
                  : product.name_en}
              </h1>

              {product.discount_price ? (
                <div className="flex flex-col items-center mb-4">
                  <p className="text-gray-400 line-through text-[15px]">
                    {product.price} {t("product.sena")}
                  </p>
                  <p className="text-[18px] font-medium text-[#002940]">
                    {product.discount_price} {t("product.sena")}
                  </p>
                </div>
              ) : (
                <p className="text-[18px] text-[#002940] mb-4">
                  <span className="font-medium">{t("product.price")}:</span>{" "}
                  {product.price} {t("product.sena")}
                </p>
              )}

              <div className="flex items-center gap-3 mt-auto">
                <button
                  className="bg-[#354f52] hover:bg-[#2f3e46] text-[#f2ce9a] px-10 py-2 rounded-md font-medium transition-all"
                  onClick={() => handlePurchase(product)}
                >
                  {t("purchase.purchase")}
                </button>
                <button
                  className="bg-[#354f52] p-2 rounded-md transition-all"
                  onClick={() => handleRemoveFromCart(product.id)}
                >
                  <MdOutlineRemoveShoppingCart className="text-[22px] text-[#f2ce9a]" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg py-10">
            {t("cart.empty")}
          </p>
        )}
      </div>

      {/* Modal */}
      <Modal open={isModalVisible} onCancel={handleCancel} footer={null} width={900} centered>
        <div className="flex max-md:flex-col items-center justify-center gap-10 p-10">
          {selectedProduct && (
            <div className="w-[450px] max-md:w-[80vw] flex flex-col items-center justify-center">
              <img
                src={selectedProduct.picture}
                alt={selectedProduct.name}
                className="w-[55%] object-contain"
              />
              <h1 className="text-[21px] font-semibold mt-3">
                {i18n.language === "uz"
                  ? selectedProduct.name_uz
                  : i18n.language === "ru"
                  ? selectedProduct.name_ru
                  : selectedProduct.name_en}
              </h1>
              <p className="text-[14px] md:text-[16px] my-3">
                {selectedProduct.discount_price ? (
                  <>
                    <span className="line-through text-gray-500 mr-3">
                      {selectedProduct.price} {t("product.sena")}
                    </span>
                    <span className="text-red-600">
                      {selectedProduct.discount_price} {t("product.sena")}
                    </span>
                  </>
                ) : (
                  <>
                    {selectedProduct.price} {t("product.sena")}
                  </>
                )}
              </p>

              <p
                className="w-[90%] line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html:
                    i18n.language === "uz"
                      ? selectedProduct.body_uz
                      : i18n.language === "ru"
                      ? selectedProduct.body_ru
                      : selectedProduct.body_en,
                }}
              ></p>
            </div>
          )}

          <div className="w-[500px] max-md:w-[80vw] flex flex-col items-center justify-center rounded-lg">
            <h1 className="text-center font-semibold text-[25px] mb-3">
              {t("purchase.purchase")}
            </h1>
            <form className="w-full flex flex-col items-center gap-3">
              <Input placeholder={t("register.name")} className="text-[17px]" />
              <Input
                value={phone}
                onChange={handlePhoneChange}
                className="text-[17px]"
                prefix={
                  <img
                    src={uzbFlag}
                    alt="UZB"
                    className="w-7 h-5 rounded-sm"
                  />
                }
              />
              <TextArea
                placeholder={t("register.message")}
                rows={4}
                className="text-[17px]"
              />
              <button className="w-full bg-[#354f52] hover:bg-[#2f3e46] text-[#f2ce9a] font-medium rounded-md px-12 mt-2 py-2 transition-all">
                {t("register.button")}
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Korzinka;