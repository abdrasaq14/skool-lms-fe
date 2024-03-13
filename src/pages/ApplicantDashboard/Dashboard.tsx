import DashboardStatsGrid from "../../components/ApplicantDashboardComponents/DashboardStatsGrid";
import RecentApplications from "../../components/ApplicantDashboardComponents/RecentApplications";

import PopularProducts from "../../components/ApplicantDashboardComponents/NotificationsPreview";
import {
    HiOutlineSearch,
  } from "react-icons/hi";

export default function ApplicantDashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <HiOutlineSearch
          fontSize={20}
          className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[24rem] h-10 pl-11 pr-4 rounded-sm"
        />
      </div>
      <DashboardStatsGrid />
      {/* <div className="flex flex-row gap-4 w-full">
                <TransactionChart />
                <BuyerProfilePieChart />
            </div> */}
      <div className="flex flex-row gap-4 w-full">
        <RecentApplications />
        <PopularProducts />
      </div>
    </div>
  );
}
