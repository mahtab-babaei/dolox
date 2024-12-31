export const dynamic = "force-dynamic";
import DashboardAd from "./DashboardAd";
import DashboardPanel from "./DashboardPanel";

export const getProfile = async () => {
  try {
    const response = await fetch("/api/profile", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "خطا در دریافت اطلاعات");
    }

    return result.data;
  } catch (error) {
    console.error("Error in getProfile:", error.message);
    return null; 
  }
};

const DashboardPage = async () => {
  return (
    <div className="flex justify-start h-fit bg-base-200 w-full pt-40 pb-10 px-4">
      <DashboardPanel />
      <DashboardAd />
    </div>
  );
};

export default DashboardPage;
