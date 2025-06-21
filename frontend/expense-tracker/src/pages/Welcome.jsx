import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";

export default function Welcome() {
  const navigate = useNavigate();
  const [grow, setGrow] = useState(false);

  useEffect(() => {
    setTimeout(() => setGrow(true), 500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e3f9f1] to-[#d1e6ff] flex flex-col justify-center items-center px-6 text-center font-[Poppins]">
      {/* Animated Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4"
        initial={{ opacity: 0, y: -40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Welcome to Budgetly
      </motion.h1>
      <p className="text-[#265832] mb-10 text-base md:text-lg max-w-xl">
        Your journey to financial freedom starts here. Track, save, and grow your
        money with purpose.
      </p>

      {/* Lottie Plant Animation */}
      <div className="w-60 md:w-80 mb-10 flex justify-center items-end">
        <DotLottieReact
          src="/Animation%20-%201750445662219.lottie"
          loop
          autoplay
          style={{ width: "100%", height: "auto", minHeight: 200 }}
        />
      </div>
      {/* Auth Buttons */}
      <div className="flex gap-6">
        <button
          onClick={() => navigate("/login")}
          className="bg-[#bd75f8] hover:bg-[#34d399] text-[#065f46] font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-md"
        >
          Sign In
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="bg-[#bd75f8] hover:bg-[#34d399] text-[#065f46] font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-md"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}


