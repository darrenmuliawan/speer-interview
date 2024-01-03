import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-w-[376px] min-h-[666px] w-screen h-screen bg-neutral-200">
      <div className="w-[376px] h-[666px] bg-white rounded-2xl">
        <Header />
        <div className="w-full">
          <Outlet />
        </div>
        {/* <Footer />
      <Toaster /> */}
      </div>
    </div>
  );
};
