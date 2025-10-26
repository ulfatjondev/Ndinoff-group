import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getDoctor } from "../../store/doctors";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const DoctorPage = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { doctor, status } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(getDoctor());
  }, [dispatch]);

  console.log(doctor);

  if (status === "loading")
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );

  if (status === "failed") return "";

  const selectedDoctor = doctor.find((doc) => doc.id === Number(id));

  return (
    <div className="container mx-auto max-md:px-4">
      <div className="flex justify-between items-center max-md:flex-col-reverse max-md:gap-10 py-20">
        <div className="max-md:w-full w-[50%] md:w-[50%] lg:w-[40%]">
          <h1 className="text-[20px] md:text-[25px] lg:text-[40px] text-[#002940]">
            {selectedDoctor.fullname}
          </h1>
          <p className="md:leading-7 lg:leading-10 text-[10px] md:text-[18px] text-[#002940] my-5">
            {i18n.language === "uz"
              ? selectedDoctor.body_uz
              : i18n.language === "ru"
              ? selectedDoctor.body_ru
              : selectedDoctor.body_en}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="btn text-[14px] md:text-[16px] lg:text-[20px] md:font-medium"
          >
            {t("Global.back")}
          </button>
        </div>
        <div className="max-md:w-full w-[45%] md:w-[40%] lg:w-[30%]">
          <img
            src={selectedDoctor.picture}
            alt=""
            className="w-full rounded-xl"
          />
        </div>
      </div>
      <div className="my-20">
        <h1 className="text-center text-[28px] md:text-[30px] lg:text-[40px] font-[500] text-[#002940]">
          {t("doctors.recommended_pills")}
        </h1>
      </div>  
    </div>
  );
};

export default DoctorPage;
