import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { Input, Spin, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../store/product";

const { TextArea } = Input;

const Korzinka = () => {
  const uzbFlag = "https://res.cloudinary.com/dmgcfv5f4/image/upload/v1742026022/flag_vdivbv.jpg";
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
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
    const filteredProducts = products?.filter((product) => cart.includes(product.id));
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
      <h1 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-[#2f3e46]">
        {t("cart.title")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cartProducts.length > 0 ? (
          cartProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between items-center text-center border hover:shadow-lg transition-all duration-300"
            >
              <img
                src={product.picture}
                alt={product.name}
                className="w-[120px] h-[100px] object-contain mb-3"
              />
              <h1 className="font-semibold text-lg mb-1">
                {i18n.language === "uz"
                  ? product.name_uz
                  : i18n.language === "ru"
                  ? product.name_ru
                  : product.name_en}
              </h1>
              <p className="text-gray-700 mb-3">
                <span className="font-medium">{t("product.price")}:</span>{" "}
                {product.price} {t("product.sena")}
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <button
                  className="bg-[#354f52] hover:bg-[#2f3e46] text-[#EECB98] px-5 py-2 rounded-md font-medium transition"
                  onClick={() => handlePurchase(product)}
                >
                  {t("purchase.purchase")}
                </button>
                <button
                  className="bg-red-100 hover:bg-red-200 p-2 rounded-md transition"
                  onClick={() => handleRemoveFromCart(product.id)}
                >
                  <MdOutlineRemoveShoppingCart className="text-[22px] text-red-600" />
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
              <img src={selectedProduct.picture} alt={selectedProduct.name} className="w-[60%] object-cover" />
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
            </div>
          )}
          <div className="w-[500px] max-md:w-[80vw] flex flex-col items-center justify-center rounded-lg">
            <h1 className="text-center font-medium text-[25px] mb-3">
              {t("cart.registerForm")}
            </h1>
            <form className="w-full flex flex-col items-center gap-3">
              <Input placeholder={t("register.name")} className="text-[17px]" />
              <Input
                value={phone}
                onChange={handlePhoneChange}
                className="text-[17px]"
                prefix={<img src={uzbFlag} alt="UZB" className="w-7 h-5 rounded-sm" />}
              />
              <TextArea placeholder={t("register.message")} rows={4} className="text-[17px]" />
              <button className="w-full bg-[#354f52] hover:bg-[#2f3e46] text-[#EECB98] font-medium rounded-md px-12 mt-2 py-2 transition">
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