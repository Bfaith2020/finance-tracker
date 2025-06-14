import React, { useContext, useRef, useState } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CharAvatar from "../Cards/CharAvatar";
import uploadImage from "../../utils/uploadImage";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuUpload } from "react-icons/lu";
import toast from "react-hot-toast";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // For profile image update
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleClick = (route) => {
    if (route === "logout") {
      handelLogout();
      return;
    }

    navigate(route);
  };

  const handelLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  // Handle profile image change
  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const imgUploadRes = await uploadImage(file);
      const profileImageUrl = imgUploadRes.imageUrl || "";
      // Update user profile on backend (use PATCH)
      await axiosInstance.patch(API_PATHS.AUTH.UPDATE_PROFILE_IMAGE, { profileImageUrl });
      // Update user context
      updateUser({ ...user, profileImageUrl });
      toast.success("Profile picture updated!");
    } catch (err) {
      toast.error("Failed to update profile picture.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          className="hidden"
          onChange={handleProfileImageChange}
        />
        {user?.profileImageUrl ? (
          <div className="relative">
            <img
              src={user?.profileImageUrl || ""}
              alt="Profile Image"
              className="w-20 h-20 bg-slate-400 rounded-full object-cover"
            />
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1"
              onClick={() => inputRef.current.click()}
              disabled={uploading}
              title="Change Profile Picture"
            >
              <LuUpload />
            </button>
          </div>
        ) : (
          <div className="relative">
            <CharAvatar
              fullName={user?.fullName}
              width="w-20"
              height="h-20"
              style="text-xl"
            />
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1"
              onClick={() => inputRef.current.click()}
              disabled={uploading}
              title="Add Profile Picture"
            >
              <LuUpload />
            </button>
          </div>
        )}

        <h5 className="text-gray-950 font-medium leading-6">
          {user.fullName || ""}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu == item.label ? "text-white bg-primary" : ""
          } py-3 px-6 rounded-lg mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
