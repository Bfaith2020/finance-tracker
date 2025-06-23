import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    //Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
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
        className="w-full max-w-md p-8 md:p-10 rounded-2xl shadow-lg border"
        style={{
          background: "var(--color-card)",
          borderColor: "var(--color-border)",
          boxShadow: "var(--color-shadow)",
        }}
      >
        <div className="mb-2 text-center">
          <h3 className="text-2xl font-bold mb-1" style={{ color: "var(--color-primary)" }}>
            Welcome Back
          </h3>
          <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
            Please enter your details to log in
          </p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

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
            LOGIN
          </button>

          <p className="text-[13px] mt-3 text-center" style={{ color: "var(--color-text-secondary)" }}>
            Don’t have an account?{" "}
            <Link
              className="font-medium underline"
              to="/signup"
              style={{ color: "var(--color-primary)" }}
            >
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

