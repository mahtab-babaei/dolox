import DashboardAd from "./DashboardAd";
import DashboardPanel from "./DashboardPanel";

const DashboardPage = async () => {
  return (
    <div className="flex justify-start h-fit bg-base-200 w-full pt-40 pb-10 px-4">
      <DashboardPanel />
      <DashboardAd />
    </div>
  );
};

export default DashboardPage;
