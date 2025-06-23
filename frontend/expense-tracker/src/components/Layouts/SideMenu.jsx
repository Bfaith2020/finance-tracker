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
    if (route === "/logout" || route === "logout") {
      handelLogout();
      return;
    }
    navigate(route);
  };

  const handelLogout = () => {
    localStorage.clear();
    clearUser();
    window.location.replace("/"); // Force full redirect to homepage
  };

  // Handle profile image change
  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const imgUploadRes = await uploadImage(file);
      const profileImageUrl = imgUploadRes?.imageUrl || "";
      if (!profileImageUrl) {
        toast.error("Image upload failed. Please try again.");
        setUploading(false);
        return;
      }
      // Update user profile on backend (use PATCH)
      await axiosInstance.patch(API_PATHS.AUTH.UPDATE_PROFILE_IMAGE, { profileImageUrl });
      // Update user context
      updateUser({ ...user, profileImageUrl });
      toast.success("Profile picture updated!");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error("Failed to update profile picture: " + err.response.data.message);
      } else {
        toast.error("Failed to update profile picture.");
      }
      console.error("Profile image update error:", err);
    } finally {
      setUploading(false);
    }
  };

  // Remove Categories from menu
  const menuItems = SIDE_MENU_DATA.filter(item => item.label !== "Categories");

  // Remove Legal Tips from menu (do not add it after Goals)
  let finalMenuItems = [...menuItems];
  // If you previously inserted Legal Tips, remove it:
  finalMenuItems = finalMenuItems.filter(item => item.label !== "Legal Tips");

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-[var(--color-card)] border-r border-[var(--color-border)] p-5 sticky top-[61px] z-20">
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
              className="w-24 h-24 bg-[var(--color-card-alt)] rounded-full object-cover border-4 border-[var(--color-primary)]/20 shadow"
            />
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full absolute -bottom-1 -right-1 shadow"
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
              width="w-24"
              height="h-24"
              style="text-2xl"
            />
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full absolute -bottom-1 -right-1 shadow"
              onClick={() => inputRef.current.click()}
              disabled={uploading}
              title="Add Profile Picture"
            >
              <LuUpload />
            </button>
          </div>
        )}

        <h5 className="text-[var(--color-text)] font-semibold leading-6">
          {user.fullName || ""}
        </h5>
      </div>
      {/* Sidebar menu items */}
      <div className="mt-8">
        {finalMenuItems.map(item => {
          if (item.label === "Logout") {
            return (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 text-[13px] px-3 py-2 rounded-md mb-2 ${
                  activeMenu == item.label
                    ? "text-white bg-[var(--color-primary)]"
                    : "text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
                }`}
                onClick={() => handleClick("logout")}
              >
                <item.icon className="text-lg" />
                {item.label}
              </button>
            );
          }
          return (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 text-[13px] px-3 py-2 rounded-md mb-2 ${
                activeMenu == item.label
                  ? "text-white bg-[var(--color-primary)]"
                  : "text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
              }`}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="text-lg" />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};



export default SideMenu;
