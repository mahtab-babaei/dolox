import { BackendURL } from "@/utils/URL";
import AdTotal from "./AdTotal";

const fetchAdDetails = async (id) => {
  try {
    const response = await fetch(`${BackendURL}/ads/${id}/`, {
      method: "GET",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return { error: "آگهی مورد نظر یافت نشد" };
      } else if (response.status === 500) {
        return { error: "خطای داخلی سرور. لطفاً دوباره تلاش کنید." };
      } else {
        return {
          error: "خطا در دریافت اطلاعات آگهی. لطفاً دوباره تلاش کنید.",
        };
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching ad details:", error.message);
    return {
      error: "خطای ناشناخته‌ای رخ داد.",
    };
  }
};

const AdDetailsPage = async ({ params }) => {
  const { id } = await params;
  const data = await fetchAdDetails(id);

  return (
    <div className="px-6 pt-40 py-40 bg-neutral">
      {data.error ? (
        <div className="text-base-content px-6 py-40 font-vazir text-center bg-neutral">
          {data.error}
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto">
          <AdTotal adDetails={data} />
        </div>
      )}
    </div>
  );
};

export default AdDetailsPage;
