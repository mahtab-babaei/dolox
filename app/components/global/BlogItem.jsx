import { convertToShamsiAndGregorian } from "@/utils/Cal";
import Image from "next/image";
import Link from "next/link";

const BlogItem = ({ blog }) => {
  const date = convertToShamsiAndGregorian(blog.date || new Date());

  return (
    <div className="!rounded-[30px] shadow">
      <div className="relative z-10">
        <Image
          className="mx-auto object-cover w-full h-64 object-center rounded-t-[30px]"
          src={blog.yoast_head_json?.og_image?.[0]?.url || "/default-image.png"} // Provide a fallback image
          width={370}
          height={208}
          alt="Blog Image"
        />
        <div className="absolute bottom-0 w-full h-16 flex pr-2 gap-2 items-center rounded-tr-[30px] rounded-bl-[14px] justify-between">
          <div className="flex items-center gap-2"></div>
        </div>
      </div>
      <div className="bg-accent-light w-full text-right py-4 px-6 rounded-b-[30px]">
        <h2 className="text-white">
          {blog.title?.rendered || "Title not available"}
        </h2>
        <div
          className='!font-vazir first-line:font-vazir text-[#818181] h-48 overflow-hidden'
          dangerouslySetInnerHTML={{
            __html: blog.excerpt?.rendered || "Excerpt not available",
          }}
        ></div>
        <div className="justify-between flex gap-2 pt-4">
          <Link className="text-secondary" href={blog.link || "#"}>
            مشاهده
          </Link>
          <div className="flex text-[#818181] gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                d="M2 7.79961C2 6.29081 2 5.53721 2.4688 5.06841C2.9376 4.59961 3.6912 4.59961 5.2 4.59961H14.8C16.3088 4.59961 17.0624 4.59961 17.5312 5.06841C18 5.53721 18 6.29081 18 7.79961C18 8.17641 18 8.36521 17.8832 8.48281C17.7656 8.59961 17.576 8.59961 17.2 8.59961H2.8C2.4232 8.59961 2.2344 8.59961 2.1168 8.48281C2 8.36521 2 8.17561 2 7.79961ZM2 14.9996C2 16.5084 2 17.262 2.4688 17.7308C2.9376 18.1996 3.6912 18.1996 5.2 18.1996H14.8C16.3088 18.1996 17.0624 18.1996 17.5312 17.7308C18 17.262 18 16.5084 18 14.9996V10.9996C18 10.6228 18 10.434 17.8832 10.3164C17.7656 10.1996 17.576 10.1996 17.2 10.1996H2.8C2.4232 10.1996 2.2344 10.1996 2.1168 10.3164C2 10.434 2 10.6236 2 10.9996V14.9996Z"
                fill="#818181"
              />
              <path
                d="M6 3V5.4M14 3V5.4"
                stroke="#818181"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className='font-["vazir"]'>
              {date.shamsi
                ? `${date.shamsi.year}/${date.shamsi.month}/${date.shamsi.day}`
                : "Date not available"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
