import React from "react";
import BlogItem from "../global/BlogItem";

const LastBlogs = ({ blogs }) => {
  return (
    <section className="mx-auto bg-base-100 px-2 pb-48">
      <div className="mx-auto max-w-screen-xl text-white relative">
        <h2 className=" text-3xl w-full text-center pt-48 ">
          به‌روزترین اخبار دنیای خودرو در دولوکس
        </h2>
        <p className='text-center max-w-2xl mx-auto font-vazir pt-3'>
          به‌روزترین اخبار و مقالات تخصصی درباره خودروهای لوکس، تکنولوژی‌های
          نوین، قوانین جدید بازار و نمایشگاه‌های خودرو را در بخش اخبار دولوکس
          دنبال کنید!
        </p>
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center text-center mt-24 gap-6 px-2">
          <BlogItem blog={blogs[0]} />
          <BlogItem blog={blogs[1]} />
          <BlogItem blog={blogs[2]} />
        </div>
      </div>
    </section>
  );
};

export default LastBlogs;
