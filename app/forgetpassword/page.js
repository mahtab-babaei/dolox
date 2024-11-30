import React from "react";
import ForgetPassword from "./ForgetPassword";
import { BackendURL } from "@/utils/URL";

export const forgetpwReq = async (phonenumber) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    phone: phonenumber,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      BackendURL + "/accounts/auth/initiate-password-reset/",
      requestOptions
    );
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const newpw = async (otp, password) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    otp: otp,
    new_password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      BackendURL + "/accounts/auth/create-password/",
      requestOptions
    );
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const ForgetPasswordPage = () => {
  return <ForgetPassword />;
};

export default ForgetPasswordPage;
