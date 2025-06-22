import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-card)]">
      <form className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md border border-[var(--color-border)] mb-4">
        {/* ...existing login form code... */}
      </form>
      <button
        className="mt-2 btn-primary px-6 py-2 rounded-lg font-semibold"
        onClick={(e) => {
          e.preventDefault();
          window.location.replace("/");
        }}
        type="button"
      >
        ← Back to Home
      </button>
    </div>
  );
};

export default Login;