import { React } from "react";
import { LogOut, Loader2 } from "lucide-react";
import useLogout from "../hooks/useLogout";

const Logout = () => {
  const { loading, logout } = useLogout();

  const handleLogout = async (e) => {
    e.preventDefault();
    if (!loading) {
      await logout();
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        disabled={loading}
        onClick={handleLogout}
        className={`flex items-center justify-center w-full gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 group ${loading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
          }`}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Logging out...</span>
          </>
        ) : (
          <>
            <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Log Out</span>
          </>
        )}
      </button>
    </div>
  );
};

export default Logout;
