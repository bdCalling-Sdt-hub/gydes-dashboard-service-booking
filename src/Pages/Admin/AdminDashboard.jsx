import OverviewCard from "../../Components/Dashboard/Overview/OverviewCards";
import UserOverview from "../../Components/Dashboard/Overview/UserOverview";
import IncomeOverview from "../../Components/Dashboard/Overview/IncomeOverview";
import RecentUser from "../../Components/Dashboard/Overview/RecentUser";
import { useGetOverviewQuery } from "../../redux/features/overview/overviewApi";

const AdminDashboard = () => {
  const { data, isFetching } = useGetOverviewQuery();
  const totalAllUsers = {
    user: data?.data?.totalUsers,
    guides: data?.data?.guides,
    seeker: data?.data?.seekers,
  };
  const recentUsers = data?.data?.recentUsers;

  return (
    <div>
      <>
        <div className="my-5">
          <OverviewCard totalAllUsers={totalAllUsers} />
        </div>

        <div className="flex flex-col lg:flex-row gap-5 mt-8">
          <UserOverview />
          <IncomeOverview />
        </div>
        <div>
          <RecentUser recentUsers={recentUsers} isFetching={isFetching} />
        </div>
      </>
    </div>
  );
};

export default AdminDashboard;
