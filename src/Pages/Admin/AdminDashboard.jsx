import OverviewCard from "../../Components/Dashboard/Overview/OverviewCards";
import UserOverview from "../../Components/Dashboard/Overview/UserOverview";
import IncomeOverview from "../../Components/Dashboard/Overview/IncomeOverview";
import RecentUser from "../../Components/Dashboard/Overview/RecentUser";
import { useGetOverviewQuery } from "../../redux/features/overview/overviewApi";
import Loading from "../../Components/UI/Loading";

const AdminDashboard = () => {
  const { data, isFetching } = useGetOverviewQuery();
  const totalAllUsers = {
    user: data?.data?.totalUsers,
    guides: data?.data?.guides,
    seeker: data?.data?.seekers,
  };
  const recentUsers = data?.data?.recentUsers;
  const userOverview = data?.userOverview;

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[88vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <>
        <div className="my-5">
          <OverviewCard totalAllUsers={totalAllUsers} />
        </div>

        <div className="flex flex-col lg:flex-row gap-5 mt-8">
          <UserOverview userOverview={userOverview} />
          <IncomeOverview />
        </div>
        <div>
          <RecentUser recentUsers={recentUsers} use isFetching={isFetching} />
        </div>
      </>
    </div>
  );
};

export default AdminDashboard;
