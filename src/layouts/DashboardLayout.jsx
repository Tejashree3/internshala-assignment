import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <>
      {/* HEADER (FIXED, FULL WIDTH) */}
      <div className="flex gap-5">
        <Header />
      <Sidebar />
        </div>      

      {/* SIDEBAR (FIXED BELOW HEADER) */}

      {/* MAIN CONTENT AREA */}
      <div className="ml-64 pt-10 min-h-screen flex flex-col bg-gray-100">
        {/* pt-24 pushes content below fixed header */}

        <main className="p-6 flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DashboardLayout;
