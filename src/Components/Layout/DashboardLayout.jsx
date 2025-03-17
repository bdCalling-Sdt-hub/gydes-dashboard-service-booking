import Topbar from "../Shared/Topbar";

// import logo from "/images/logo.png";
import dashboardLogo from "/images/dashboard-logo/dashboard.svg";
import users from "/images/dashboard-logo/users.svg";
import earning from "/images/dashboard-logo/earning.svg";
import reports from "/images/dashboard-logo/reports.svg";
import events from "/images/dashboard-logo/events.svg";
import subscription from "/images/dashboard-logo/subscription.svg";
import withdraw from "/images/dashboard-logo/withdraw.svg";

import setting from "/images/dashboard-logo/setting.svg";
import faq from "/images/dashboard-logo/faq.svg";
import profile from "/images/dashboard-logo/profile.svg";
import privacyPolicy from "/images/dashboard-logo/privacyPolicy.svg";
import termsOfUse from "/images/dashboard-logo/termsOfUse.svg";
import logout from "/images/dashboard-logo/logout.svg";

import {
  Link,
  NavLink,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { AllImages } from "../../../public/images/AllImages";
import Cookies from "js-cookie";
import { decodedToken } from "../../utils/jwt";
import { useDispatch } from "react-redux";
import { clearAuth } from "../../redux/features/auth/authSlice";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("gydes_accessToken");
  const user = decodedToken(token); // Parse the stored JSON string
  const location = useLocation();
  const pathSegment = location.pathname.split("/").pop();
  const currentPath = location.pathname;

  // Logic to set active keys
  const activeKeys = (() => {
    if (currentPath.includes("/profile")) {
      return ["profile"];
    }
    if (currentPath.includes("/faq")) {
      return ["faq"];
    }
    if (currentPath.includes("/privacy-policy")) {
      return ["privacy-policy"];
    }
    if (currentPath.includes("/add-feedback")) {
      return ["add-feedback"];
    }
    if (currentPath.includes("/show-feedback")) {
      return ["show-feedback"];
    }
    if (currentPath.includes("/terms-and-condition")) {
      return ["terms-and-condition"];
    }
    return [currentPath.split("/")[1]]; // Default fallback
  })();

  const [collapsed, setCollapsed] = useState(false);

  // Use effect to handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleLogout = () => {
    dispatch(clearAuth());
    Cookies.remove("gydes_accessToken");
    window.location.href = "/signin";
    window.location.reload();
  };
  const adminMenuItems = [
    {
      key: "dashboard",
      icon: (
        <img
          src={dashboardLogo}
          alt="dashboard"
          width={20}
          style={{
            filter: location.pathname.includes("dashboard")
              ? "invert(38%) sepia(85%) saturate(5500%) hue-rotate(190deg) brightness(90%) contrast(90%)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="dashboard">Overview</NavLink>,
    },
    {
      key: "users",
      icon: (
        <img
          src={users}
          alt="users"
          width={20}
          style={{
            filter: location.pathname.includes("users")
              ? "invert(38%) sepia(85%) saturate(5500%) hue-rotate(190deg) brightness(90%) contrast(90%)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="users">Users</NavLink>,
    },
    {
      key: "earning",
      icon: (
        <img
          src={earning}
          alt="users"
          width={20}
          style={{
            filter: location.pathname.includes("earning")
              ? "invert(38%) sepia(85%) saturate(5500%) hue-rotate(190deg) brightness(90%) contrast(90%)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="earning">Transactions</NavLink>,
    },
    {
      key: "reports",
      icon: (
        <img
          src={reports}
          alt="users"
          width={20}
          style={{
            filter: location.pathname.includes("reports")
              ? "invert(38%) sepia(85%) saturate(5500%) hue-rotate(190deg) brightness(90%) contrast(90%)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="reports">Reports</NavLink>,
    },
    {
      key: "events",
      icon: (
        <img
          src={events}
          alt="users"
          width={20}
          style={{
            filter: location.pathname.includes("events")
              ? "invert(38%) sepia(85%) saturate(5500%) hue-rotate(190deg) brightness(90%) contrast(90%)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="events">Events</NavLink>,
    },
    {
      key: "withdraw",
      icon: (
        <img
          src={withdraw}
          alt="withdraw"
          width={20}
          style={{
            filter: location.pathname.includes("withdraw")
              ? "invert(38%) sepia(85%) saturate(5500%) hue-rotate(190deg) brightness(90%) contrast(90%)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="withdraw">Withdraw</NavLink>,
    },
    {
      key: "subscription",
      icon: (
        <img
          src={subscription}
          alt="subscription"
          width={20}
          style={{
            filter: location.pathname.includes("subscription")
              ? "invert(38%) sepia(85%) saturate(5500%) hue-rotate(190deg) brightness(90%) contrast(90%)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="subscription">Subscription</NavLink>,
    },
  ];

  const commonItems = [
    {
      key: "settings",
      label: <span className="text-primary-color">Setting</span>,
      icon: <img src={setting} alt="setting" width={16} height={16} />,
      children: [
        // Include Privacy Policy and Terms of Service only for admin users
        ...(user?.role === "admin"
          ? [
              {
                key: "profile",
                icon: (
                  <img
                    src={profile}
                    alt="profile"
                    width={16}
                    height={16}
                    style={{
                      filter: location.pathname.includes("profile")
                        ? "invert(38%) sepia(85%) saturate(5500%) hue-rotate(190deg) brightness(90%) contrast(90%)"
                        : undefined,
                    }}
                  />
                ),
                label: <NavLink to="profile">Profile</NavLink>,
              },
              {
                key: "faq",
                icon: (
                  <img
                    src={faq}
                    alt="faq"
                    width={16}
                    height={16}
                    style={{
                      filter: location.pathname.includes("faq")
                        ? "invert(38%) sepia(85%) saturate(5500%) hue-rotate(190deg) brightness(90%) contrast(90%)"
                        : undefined,
                    }}
                  />
                ),
                label: <NavLink to="faq">FAQ</NavLink>,
              },
              {
                key: "privacy-policy",
                icon: (
                  <img
                    src={privacyPolicy}
                    alt="profile"
                    width={16}
                    height={16}
                    style={{
                      filter: location.pathname.includes("privacy-policy")
                        ? "invert(38%) sepia(85%) saturate(5500%) hue-rotate(190deg) brightness(90%) contrast(90%)"
                        : undefined,
                    }}
                  />
                ),
                label: <NavLink to="privacy-policy">Privacy Policy</NavLink>,
              },
              {
                key: "terms-and-condition",
                icon: (
                  <img
                    src={termsOfUse}
                    alt="profile"
                    width={16}
                    height={16}
                    style={{
                      filter: location.pathname.includes("terms-and-condition")
                        ? "invert(38%) sepia(85%) saturate(5500%) hue-rotate(190deg) brightness(90%) contrast(90%)"
                        : undefined,
                    }}
                  />
                ),
                label: (
                  <NavLink to="terms-and-condition">Terms & Conditions</NavLink>
                ),
              },
            ]
          : []),
      ],
    },

    {
      key: "logout",
      icon: (
        <img
          src={logout}
          alt="logout"
          width={16}
          height={16}
          style={{ color: "#222222", fontSize: "16px" }}
        />
      ),
      label: (
        <div onClick={handleLogout}>
          <span>Logout</span>
        </div>
      ),
    },
  ];

  // Select the appropriate menu items based on user role
  const menuItems = user?.role === "admin" ? adminMenuItems : "";

  return (
    <div className="h-screen bg-white ">
      <ScrollRestoration />
      <Layout className="!relative !bg-white">
        <Sider
          width={250}
          trigger={null}
          breakpoint="lg"
          collapsedWidth="0"
          collapsible
          collapsed={collapsed}
          style={{
            background: "#0861C5",
            boxShadow: "0px 0px 5px #00000040",
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
          }}
          className=""
        >
          <Link to="/">
            <img
              src={AllImages.logo}
              alt="logo"
              width={1000}
              height={1000}
              sizes="100vw"
              className="my-5 mx-auto w-[60%]"
            />
          </Link>

          {/* Menu items */}
          <Typography.Title
            className="mb-1"
            level={5}
            style={{
              color: "#fff",
              paddingLeft: "6px",
              paddingRight: "6px",
              marginLeft: "12%",
            }}
          >
            Menu
          </Typography.Title>
          <Menu
            mode="inline"
            defaultSelectedKeys={pathSegment}
            selectedKeys={pathSegment}
            style={{
              backgroundColor: "transparent",
              border: "none",
              paddingLeft: "6px",
              paddingRight: "6px",
            }}
            items={menuItems}
          />

          {/* Other menu items */}
          <Typography.Title
            level={5}
            className="mt-5"
            style={{
              color: "#fff",
              paddingLeft: "6px",
              paddingRight: "6px",
              marginLeft: "12%",
            }}
          >
            Other
          </Typography.Title>
          <Menu
            mode="inline"
            defaultSelectedKeys={pathSegment}
            selectedKeys={activeKeys}
            style={{
              paddingBottom: "40px",
              backgroundColor: "transparent",
              border: "none",
              paddingLeft: "6px",
              paddingRight: "6px",
            }}
            items={commonItems}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              background: "#ffffff",
              position: "sticky",
              top: 0,
              zIndex: 999,
              marginLeft: 0,
            }}
          >
            <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Header>
          <Content>
            <div className="bg-white px-2 xl:px-5 py-4 xl:py-5">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default DashboardLayout;
