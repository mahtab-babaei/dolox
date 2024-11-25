import Link from "next/link";
import React from "react";

const PasswordChanged = () => {
  return (
    <section className="mx-auto md:py-64 py-40 px-2 bg-base-200">
      <div className="mx-auto max-w-screen-xl text-black">
        <div className="flex bg-white md:max-w-2xl max-w-sm mx-auto rounded-[34px] flex-col md:flex-row">
          <div className="w-full p-8 text-xl text-center">
            <h1 className="">رمز شما تغییر کرد</h1>
            <p> همین حالا وارد شوید</p>
            <Link
              href="/login"
              type="submit"
              className="btn bg-secondary border-none text-white !min-h-1 h-10 mt-4"
            >
              صفحه ورود
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PasswordChanged;
