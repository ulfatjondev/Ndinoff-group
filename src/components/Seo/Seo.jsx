import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Seo = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const seoData = {
    uz: {
      title: "Ndinoff — Sog‘lom hayot uchun zamonaviy yechimlar",
      description:
        "Ndinoff — 2020-yildan buyon O‘zbekistonda faoliyat yuritayotgan ishlab chiqaruvchi kompaniya. Biz tabiiy va ilmiy asoslangan mahsulotlar orqali sog‘lom hayotni rivojlantiramiz.",
      keywords:
        "Ndinoff, sog‘lom hayot, biologik qo‘shimchalar, kosmetika, O‘zbekiston, tabiiy mahsulotlar",
    },
    ru: {
      title: "Ndinoff — Современные решения для здоровья и красоты",
      description:
        "Ndinoff — производственная компания из Узбекистана, развивающая культуру здорового образа жизни и создающая качественные, безопасные продукты.",
      keywords:
        "Ndinoff, здоровье, красота, БАДы, косметика, Узбекистан",
    },
    en: {
      title: "Ndinoff — Modern health & beauty innovations",
      description:
        "Ndinoff is a modern manufacturing company in Uzbekistan promoting health, beauty, and a balanced lifestyle through science-based, natural products.",
      keywords:
        "Ndinoff, health, beauty, supplements, Uzbekistan, cosmetics",
    },
  };

  const current = seoData[lang] || seoData.uz;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{current.title}</title>
      <meta name="description" content={current.description} />
      <meta name="keywords" content={current.keywords} />
      <meta name="author" content="NDINOFF" />
      <meta
        property="og:title"
        content={current.title}
      />
      <meta
        property="og:description"
        content={current.description}
      />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/dmgcfv5f4/image/upload/v1742026078/logo_zqcq7u.png"
      />
      <meta property="og:url" content="https://ndinoff.uz" />
    </Helmet>
  );
};

export default Seo;