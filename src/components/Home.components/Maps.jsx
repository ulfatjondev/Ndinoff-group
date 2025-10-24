import { useTranslation } from "react-i18next";

const GoogleMap = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto my-10 py-10">
      <h1 className="text-center text-[28px] md:text-[30px] lg:text-[40px] font-[500] mb-10">
        {t("adress.title")}
      </h1>

      <div className="relative w-full max-md:w-[90vw] mx-auto h-[450px] max-md:h-[300px] border overflow-hidden rounded-xl shadow-md">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47914.30772277073!2d69.1763341145424!3d41.36008597660565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8c479e45ded7%3A0xb0939da2a41a79de!2z0JDQu9C80LDQt9Cw0YDRgdC60LjQuSDRgNCw0LnQvtC9LCDQotCw0YjQutC10L3Rgiwg0KLQsNGI0LrQtdC90YLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwg0KPQt9Cx0LXQutC40YHRgtCw0L0!5e0!3m2!1sru!2s!4v1761109932490!5m2!1sru!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default GoogleMap;