import { cities } from "@/utils/constants";
import { useFormik } from "formik";
import * as Yup from "yup";
import StepButtons from "../components/global/StepButtons";

const Address = ({ step, setStep, setCity, city, setAddress }) => {
  // validation schema
  const validationSchema = Yup.object({
    city: Yup.string().required("لطفا یک شهر انتخاب کنید"),
    address: Yup.string().required("لطفا آدرس خود را وارد کنید"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      city: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setCity(values.city);
      setAddress(values.address);
      setStep(3);
    },
    validateOnChange: true,
  });

  if (step !== 2) return null;
  return (
    <div className="px-2 md:px-0 font-vazir">
      <div className="py-2 md:max-w-lg mx-auto">
        <StepButtons onSubmit={formik.handleSubmit} step={step} setStep={setStep} />
        <div className="pt-8">
          <label dir="rtl" className="form-control w-full font-vazir">
            <select
              id="city"
              className="input focus:outline-secondary border-none w-full bg-base-300 font-vazir"
              value={city}
              {...formik.getFieldProps("city")}
            >
              <option value="" label="انتخاب شهر" />
              {cities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {formik.touched.city && formik.errors.city ? (
              <div className="text-red-500 text-sm pt-1">
                {formik.errors.city}
              </div>
            ) : null}
          </label>

          <label className="form-control" dir="rtl">
            <textarea
              className="text-base textarea mt-8 h-40 flex items-center gap-2 md:max-w-screen-sm mx-auto bg-base-300 placeholder:text-base-content w-full"
              placeholder="آدرس"
              {...formik.getFieldProps("address")}
            ></textarea>
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500 text-sm pt-1">
                {formik.errors.address}
              </div>
            ) : null}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Address;
