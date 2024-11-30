import { verifyAccount } from "./page";
import React, { useRef, useState, useEffect } from "react";

const OTP = ({ setstep, phonenumber }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [message, setmessage] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus on the first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    const value = element.target.value;

    // Only allow numbers and make sure it's a single digit
    if (/^\d$/.test(value)) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically move to the next input
      if (index < 5 && value) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index]) {
        // Move to the previous input when deleting
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
      } else {
        // Remove the digit from current input and stay focused
        let newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      const response = await verifyAccount(otpValue, phonenumber);
      if (response.success) {
        setstep(2);
      } else {
        setmessage(response.message);
      }
    } else {
      // Handle incomplete OTP case
    }
  };

  return (
    <section className="mx-auto md:py-64 py-40 px-2 bg-base-200">
      <div className="mx-auto max-w-screen-xl text-black">
        <div className="flex bg-white md:max-w-2xl max-w-sm mx-auto rounded-[34px] flex-col md:flex-row">
          <div className="w-full p-8 text-xl text-center">
            <h1 className="">ورود کد تایید</h1>
            <p className='pb-2 text-sm font-["vazir"]'>
              کد ارسال شده به شماره تلفن خود را وارد کنید
            </p>
            <form className="pt-4" onSubmit={handleSubmit}>
              <div
                dir="ltr"
                className="flex gap-2 justify-center mx-auto w-full"
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="input focus:outline-primary border-none w-10 h-10 text-center text-xl p-1 text-black bg-base-200 font-['vazir']"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                ))}
              </div>
              <p className='pb-2 text-sm font-["vazir"]'>{message}</p>
              <button
                type="submit"
                className="btn bg-primary border-none text-white !min-h-1 h-10 mt-4"
              >
                تایید
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OTP;
