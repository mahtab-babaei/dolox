import React from "react";
import DashboardPanel from "../dashboard/DashboardPanel";
import Notifications from "./Notifications";

const page = () => {
  return (
    <div className="bg-base-200 w-full">
      <div className="flex justify-start pt-40 pb-10 px-4 gap-4 max-w-screen-lg">
        <DashboardPanel />
        <Notifications />
      </div>
    </div>
  );
};

export default page;
