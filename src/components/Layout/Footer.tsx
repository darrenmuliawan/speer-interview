import { ArchiveBoxIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useNavigationState } from "../../state";
import { cn } from "../../utils";
import { useLocation, useNavigate } from "react-router-dom";
import { ARCHIVED_ROUTE, HOMEPAGE_ROUTE } from "../../constants/routes";
import { useEffect } from "react";

export const Footer = () => {
  const { selectedFooterTab, setSelectedFooterTab } = useNavigationState();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  useEffect(() => {
    if (pathname === HOMEPAGE_ROUTE) {
      setSelectedFooterTab("activity");
    } else if (pathname === ARCHIVED_ROUTE) {
      setSelectedFooterTab("archived");
    }
  }, [pathname]);

  return (
    <footer className="border-t border-neutral-200 h-[70px] flex justify-between">
      <div
        className={cn(
          "flex items-center justify-center w-full border-r border-neutral-200 flex-col gap-0.5 cursor-pointer opacity-70 hover:opacity-100 duration-200 rounded-bl-2xl",
          selectedFooterTab === "activity"
            ? "opacity-100 font-medium bg-white"
            : "bg-neutral-100"
        )}
        onClick={() => {
          navigate(HOMEPAGE_ROUTE);
          setSelectedFooterTab("activity");
        }}
      >
        <ClockIcon
          className="h-6 w-6"
          strokeWidth={selectedFooterTab === "activity" ? 2 : 1}
        />
        <p className="text-sm">Activity</p>
      </div>
      <div
        className={cn(
          "flex items-center justify-center w-full flex-col gap-0.5 cursor-pointer opacity-70 hover:opacity-100 duration-200 rounded-br-2xl",
          selectedFooterTab === "archived"
            ? "opacity-100 font-medium bg-white"
            : "bg-neutral-100"
        )}
        onClick={() => {
          navigate(ARCHIVED_ROUTE);
          setSelectedFooterTab("archived");
        }}
      >
        <ArchiveBoxIcon
          className="h-6 w-6"
          strokeWidth={selectedFooterTab === "archived" ? 2 : 1}
        />
        <p className="text-xs">Archived</p>
      </div>
    </footer>
  );
};
