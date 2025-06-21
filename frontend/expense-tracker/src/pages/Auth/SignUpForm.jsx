import React, { useContext, useState } from "react";
import AuthLayout from "../../components/Layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";

const SignUpForm = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Sign Up Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    // SignUp API Call
    try {
      // Upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
      <div
        className="w-full max-w-lg p-8 md:p-10 rounded-2xl shadow-lg border"
        style={{
          background: "var(--color-card)",
          borderColor: "var(--color-border)",
          boxShadow: "var(--color-shadow)",
        }}
      >
        <div className="mb-2 text-center">
          <h3 className="text-2xl font-bold mb-1" style={{ color: "var(--color-primary)" }}>
            Create an Account
          </h3>
          <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
            Join us today by entering your details below.
          </p>
        </div>
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />

            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs pb-2.5" style={{ color: "var(--color-danger)" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2 mt-2 text-base font-semibold rounded-xl"
            style={{
              background: "linear-gradient(90deg, var(--color-primary), var(--color-primary-end))",
              color: "#fff",
              boxShadow: "var(--color-shadow)",
            }}
          >
            SIGN UP
          </button>

          <p className="text-[13px] mt-3 text-center" style={{ color: "var(--color-text-secondary)" }}>
            Already have an account?{" "}
            <Link
              className="font-medium underline"
              to="/login"
              style={{ color: "var(--color-primary)" }}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
