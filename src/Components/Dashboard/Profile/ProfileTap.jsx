const ProfileTap = ({ activeTab, setActiveTab }) => {
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="flex mt-5">
      {/* Edit Profile Tab */}
      <button
        onClick={() => handleTabClick("editProfile")}
        className={`text-lg font-medium py-2 ${
          activeTab === "editProfile"
            ? "bg-gradient-to-b from-[#487fff44] to-[#487fff11] text-[#487fff] border-t-2 border-[#487fff]"
            : "text-[#4b5563] border-t-2 border-gray-300"
        }`}
      >
        <span className="px-4">Edit Profile</span>
      </button>

      {/* Change Password Tab */}
      <button
        onClick={() => handleTabClick("changePassword")}
        className={`text-lg font-medium py-2 ${
          activeTab === "changePassword"
            ? "bg-gradient-to-b from-[#487fff44] to-[#487fff11] text-[#487fff] border-t-2 border-[#487fff]"
            : "text-[#4b5563] border-t-2 border-gray-300"
        }`}
      >
        <span className="px-4">Change Password</span>
      </button>
    </div>
  );
};

export default ProfileTap;
