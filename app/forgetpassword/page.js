'use client'
import ForgetPasswordSection from './ForgetPasswordSection'
import ForgetPWOTP from './ForgetPWOTP'
import NewPW from './NewPW'
import PasswordChanged from './PasswordChanged'
import React, { useState } from 'react'

const Forgetpassword = () => {
  const [phonenumber, setphonenumber] = useState();
  const [OTP, setOTP] = useState(-1);
  const [step, setStep] = useState(0);
  return (
      <div>
      {step === 0 &&
        <ForgetPasswordSection setphonenumber={setphonenumber} setStep={setStep} />
      }
      {step === 1 &&
        <ForgetPWOTP setOTP={setOTP} setStep={setStep} />
      }
      {step === 2 &&
        <NewPW OTP={OTP} setStep={setStep} />
      }
      {step === 3 &&
        <PasswordChanged />
      }
   </div>
  )
}

export default Forgetpassword
