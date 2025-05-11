import { cities } from "@/utils/constants";
import { useFormik } from "formik";
import * as Yup from "yup";
import StepButtons from "../components/global/StepButtons";
import ErrorMessage from "../components/global/ErrorMessage";

const Address = ({
  step,
  setStep,
  setCity,
  city,
  setAddress,
  address = "",
}) => {
  // validation schema
  const validationSchema = Yup.object({
    city: Yup.string().required("لطفا یک شهر انتخاب کنید"),
    address: Yup.string().required("لطفا آدرس خود را وارد کنید"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      city: city || "",
      address: address || "",
    },
    validationSchema,
    onSubmit: (values) => {
      setCity(values.city);
      setAddress(values.address);
      setStep(3);
    },
    validateOnChange: true,
    enableReinitialize: true,
  });

  if (step !== 2) return null;
  return (
    <div className="px-2 md:px-0 font-vazir">
      <div className="py-2 md:max-w-lg mx-auto">
        <StepButtons
          onSubmit={formik.handleSubmit}
          step={step}
          setStep={setStep}
        />
        <div className="pt-8">
          <label dir="rtl" className="form-control w-full font-vazir">
            <select
              id="city"
              className={`select text-base mb-1 border-none w-full bg-neutral font-vazir ${
                formik.values.city === "" ? "text-base-content" : "text-black"
              }`}
              value={city}
              {...formik.getFieldProps("city")}
            >
              <option className="text-black" value="" label="انتخاب شهر" />
              {cities.map((item) => (
                <option
                  className="text-black"
                  key={item}
                  value={item}
                  disabled={item === "همه شهر ها"}
                >
                  {item}
                </option>
              ))}
            </select>
            {formik.touched.city && formik.errors.city ? (
              <ErrorMessage>{formik.errors.city}</ErrorMessage>
            ) : null}
          </label>

          <label className="form-control" dir="rtl">
            <textarea
              className="text-base text-black textarea mt-8 h-40 flex items-center gap-2 md:max-w-screen-sm mx-auto bg-neutral placeholder:text-base-content w-full"
              placeholder="آدرس"
              {...formik.getFieldProps("address")}
            ></textarea>
            {formik.touched.address && formik.errors.address ? (
              <ErrorMessage>{formik.errors.address}</ErrorMessage>
            ) : null}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Address;
