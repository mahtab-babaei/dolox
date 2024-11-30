import React from "react";
import RegisterPage from "./RegisterPage";
import { BackendURL } from "@/utils/URL";

export const createUserReq = async (password, username, phonenumber) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
      "phone_number": phonenumber,  // Use the provided phone number
      "username": username,         // Use the provided username
      "password": password          // Use the provided password
  });

  const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };

  try {
      const response = await fetch(BackendURL + '/accounts/users/', requestOptions);

      if (response.status === 200) {
          return await response.json(); // Return the parsed JSON for status 200
      } else if (response.status === 400) {
          return { message: 'کابر قبلا ثبت نام کرده' }; // Custom message for status 400
      } else {
          console.log(response.status);
          throw new Error('Failed with status code: ' + response.status);
      }
  } catch (error) {
      console.error(error);
      throw error;
  }
};

export const verifyAccount = async (otp,  phonenumber) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
      "otp": otp,
      "phone_number": phonenumber
  });

  const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };

  try {
      const response = await fetch(BackendURL + '/accounts/auth/verify-account/', requestOptions);
      return await response.json();
  } catch (error) {
      console.error(error);
      throw error;
  }
};  

const Register = () => {
  return <RegisterPage />;
};

export default Register;
