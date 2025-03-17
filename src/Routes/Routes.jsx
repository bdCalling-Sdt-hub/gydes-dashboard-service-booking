/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import DashboardLayout from "../Components/Layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import Loading from "../Components/UI/Loading";

//* Auth
import SignIn from "../Pages/Auth/SignIn";
import ForgotPassword from "../Pages/Auth/ForgetPassword";
import OtpPage from "../Pages/Auth/OtpPage";
import UpdatePassword from "../Pages/Auth/UpdatePassword";

//* Common
import Profile from "../Pages/Common/settings/Profile";
import TermsOfService from "../Pages/Common/settings/TermsOfService";
import PrivacyPolicy from "../Pages/Common/settings/PrivacyPolicy";

//* Admin Dashboard
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import Notifications from "../Pages/Common/Notifications";
import Users from "../Pages/Admin/Users";
import Earning from "../Pages/Admin/Earning";
import Reports from "../Pages/Admin/Reports";
import NotFoundPage from "../Components/NotFound/NotFound";
import Events from "../Pages/Admin/Events";
import Cookies from "js-cookie";
import { decodedToken } from "../utils/jwt";
import SubscriptionPage from "../Pages/Admin/SubscriptionPage";
import FAQPage from "../Pages/Admin/FAQ";
import WithdrawSection from "../Components/Dashboard/Withdraw/WithdrawSection";

function AuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("gydes_accessToken");

    if (token) {
      const user = decodedToken(token);
      if (user || user?.role === "admin") {
        navigate(`/${user.role}/dashboard`, { replace: true });
      } else {
        navigate("/signin", { replace: true });
      }
    } else {
      navigate("/signin", { replace: true });
    }
  }, [navigate]);

  // Optionally display a loading indicator
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loading />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "/dashboard",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "/admin",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "earning",
        element: <Earning />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "withdraw",
        element: <WithdrawSection />,
      },
      {
        path: "subscription",
        element: <SubscriptionPage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "faq",
        element: <FAQPage />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms-and-condition",
        element: <TermsOfService />,
      },
    ],
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "verify-otp",
    element: <OtpPage />,
  },
  {
    path: "update-password",
    element: <UpdatePassword />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
