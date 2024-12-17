import React from "react";
import DashboardPanel from "../DashboardPanel";
import DashboardAuto from "./DashboardAuto";
import { getProfile } from "../page";

const AutoPage = async () => {
  const profile = await getProfile();
  return (
    <div className="flex justify-start h-fit bg-base-200 w-full pt-40 pb-10 px-4">
      <DashboardPanel />
      <DashboardAuto profile={profile} />
    </div>
  );
};

export default AutoPage;
