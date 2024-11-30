import LoginSection from "./LoginSection";
import React from "react";
import { BackendURL } from "@/utils/URL";

export const loginReq = async (phonenumber, password) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    phone_number: phonenumber,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(BackendURL + "/accounts/token", requestOptions)
    .then(async (response) => {
      console.log("Status Code:", response.status); // Log the status code

      if (!response.ok) {
        let errorMessage = "خطایی رخ داده است"; // Default error message
        switch (response.status) {
          case 400:
            errorMessage = "درخواست اشتباه است. لطفا اطلاعات را بررسی کنید.";
            break;
          case 401:
            errorMessage = "رمز یا شماره تلفن اشتباه است";
            break;
          case 403:
            errorMessage = "دسترسی مجاز نیست. لطفا دوباره تلاش کنید";
            break;
          default:
            errorMessage = "خطای ناشناخته. لطفا دوباره تلاش کنید";
            break;
        }

        return response.json().then((errorData) => {
          throw new Error(errorData.message || errorMessage);
        });
      }

      // If everything is fine, return the response data
      return response.json();
    })
    .catch((error) => {
      // Handle network or other errors
      console.error("Login error:", error);
      throw new Error("رمز یا شماره اشتباه است");
    });
};

const login = () => {
  return (
    <div>
      <LoginSection />
    </div>
  );
};

export default login;
