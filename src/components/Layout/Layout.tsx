import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Toaster } from "../Toast";

export const Layout = ({ showFooter = true, showBackButton = false }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-w-[376px] min-h-[666px] w-screen h-screen bg-neutral-200">
      <div className="w-[376px] h-[666px] bg-white rounded-2xl flex flex-col relative">
        <Header showBackButton={showBackButton} />
        <div className="w-full flex-1 overflow-auto">
          <Outlet />
        </div>
        {showFooter && <Footer />}
        <Toaster />
      </div>
    </div>
  );
};
