"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getVerifyPayment } from "@/utils/Requests";
import Link from "next/link";

export default function VerifyPaymentPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [refId, setRefId] = useState(null);
  const [code, setCode] = useState(null);

  useEffect(() => {
    const subscription_plan_id = searchParams.get("subscription_plan_id");
    const user_id = searchParams.get("user_id");
    const Authority = searchParams.get("Authority");
    const Status = searchParams.get("Status");

    if (!subscription_plan_id || !user_id || !Authority || Status !== "OK") {
      setSuccess(false);
      setLoading(false);
      return;
    }

    const verifyQueries = `?subscription_plan_id=${subscription_plan_id}&user_id=${user_id}&Authority=${Authority}&Status=${Status}`;

    const verify = async () => {
      setLoading(true);
      const result = await getVerifyPayment(verifyQueries);
      if (result.status === "success" && result.RefID) {
        setSuccess(true);
        setRefId(result.RefID);
      } else if (result.success === false && result.code) {
        setSuccess(false);
        setCode(result?.code);
      } else {
        setSuccess(false);
      }
      setLoading(false);
    };

    verify();
  }, [searchParams]);

  return (
    <div className="h-screen bg-neutral flex justify-center items-center font-vazir ">
      <div className="flex flex-col items-center">
        <Image src="/images/logo.png" alt="" width={200} height={80} />

        {/* Under revie */}
        {loading && (
          <div className="flex items-center mt-2">
            <p className="text-gray-700 pl-3">در حال بررسی پرداخت</p>
            <span className="loading loading-spinner loading-md text-secondary"></span>
          </div>
        )}

        {/* Success */}
        {!loading && success === true && (
          <>
            <p className="text-gray-700 mt-2">پرداخت با موفقیت انجام شد 🎉</p>
            <p className="text-gray-700">کد رهگیری: {refId}</p>
          </>
        )}

        {/* Failed */}
        {!loading && success === false && code !== 101 && (
          <p className="text-gray-700 mt-2">
            پرداخت با خطا مواجه شد 😞 لطفاً مجدداً تلاش کنید.
          </p>
        )}

        {/* Already done */}
        {!loading && success === false && code === 101 && (
          <p className="text-gray-700 mt-2">
            این پرداخت قبلاً با موفقیت انجام شده است 😉
          </p>
        )}

        <Link
          href="/dashboard"
          className="btn bg-secondary border-none text-white text-lg font-normal my-6 rounded-lg"
        >
          رفتن به داشبورد
        </Link>
      </div>
    </div>
  );
}
