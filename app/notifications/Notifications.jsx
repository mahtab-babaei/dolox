"use client";
import React, { useState, useEffect } from "react";
import { getNotifications } from "@/utils/Requests";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);

      const result = await getNotifications(currentPage);

      if (result.success === false) {
        setError(result.message);
      } else {
        setNotifications(result.results || []);
        setTotalPages(result.total_page || 1);
      }

      setLoading(false);
    };

    fetchNotifications();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="bg-white h-full min-h-screen overflow-y-auto rounded-[34px] w-full p-4 font-vazir">
      {loading ? (
        <div className="p-4 text-center text-black font-vazir">
          <p>در حال بارگذاری...</p>
        </div>
      ) : error ? (
        <div className="p-4 text-center text-gray-500 font-vazir">
          <p>{error}</p>
        </div>
      ) : notifications.length === 0 ? (
        <p className="text-center text-gray-500">اعلانی یافت نشد.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`p-4 rounded-lg shadow ${
                  notification.is_read ? "bg-white" : "bg-base-200"
                }`}
              >
                <p className="text-black">{notification.message}</p>
                <p className="text-sm pt-2 text-gray-500">
                  تاریخ:{" "}
                  {new Date(notification.created_at).toLocaleString("fa-IR")}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4 mb-10">
            <button
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
              className="btn border-none bg-primary text-white disabled:text-white"
            >
              صفحه قبل
            </button>
            <button
              onClick={handleNextPage}
              className="btn border-none bg-primary text-white disabled:text-white"
              disabled={currentPage === totalPages}
            >
              صفحه بعد
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Notifications;
