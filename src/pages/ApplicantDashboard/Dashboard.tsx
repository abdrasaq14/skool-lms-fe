import DashboardStatsGrid from '../../components/ApplicantDashboardComponents/DashboardStatsGrid'
import RecentOrders from '../../components/ApplicantDashboardComponents/RecentApplications'

import PopularProducts from '../../components/ApplicantDashboardComponents/Notifications'

export default function ApplicantDashboard() {
    return (
        <div className="flex flex-col gap-4">
            <DashboardStatsGrid />
            {/* <div className="flex flex-row gap-4 w-full">
                <TransactionChart />
                <BuyerProfilePieChart />
            </div> */}
            <div className="flex flex-row gap-4 w-full">
                <RecentOrders />
                <PopularProducts />
            </div>
        </div>
    )
}
