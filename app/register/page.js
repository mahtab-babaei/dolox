"use client";
import AccountCreated from "./AccountCreated";
import OTP from "./OTP";
import RegisterSection from "./RegisterSection";
import React, { useState } from "react";

const Register = () => {
  // step 0 userinformation
  // step 1 otp code
  // step 2 success
  const [phonenumber, setphonenumber] = useState(-1);
  const [step, setStep] = useState(0);
  return (
    <div>
      {step === 0 && (
        <RegisterSection setstep={setStep} setphonenumber={setphonenumber} />
      )}
      {step === 1 && <OTP phonenumber={phonenumber} setstep={setStep} />}
      {step === 2 && <AccountCreated />}
    </div>
  );
};

export default Register;
