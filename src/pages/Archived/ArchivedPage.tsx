import { useEffect, useMemo } from "react";
import { Skeleton } from "../../components/Skeleton";
import { IActivity } from "../../interfaces";
import {
  InboxArrowDownIcon,
  PhoneArrowDownLeftIcon,
  PhoneArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import { cn } from "../../utils";
import { format } from "date-fns";
import { useActivities } from "../../state/Activity/useActivities";
import { useFetchActivities } from "../../state/Activity/useFetchActivities";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { useUnarchiveAll } from "../../state/Activity/useUnarchiveAll";

export const ArchivedPage = () => {
  const { activities, isLoadingActivities } = useActivities();
  const fetchActivitiesMutation = useFetchActivities();

  // group activity per date
  const groupedActivities = useMemo(() => {
    if (activities.length > 0) {
      var grouped: { [key: string]: IActivity[] } = {};

      // sort activities by created_at
      activities.sort((a, b) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });

      // group activities by date
      activities.forEach((activity) => {
        const date = format(activity.created_at, "MMM dd, yyyy");

        if (!activity.is_archived) {
          return;
        }

        if (!grouped[date]) {
          grouped[date] = [];
        }
        grouped[date].push(activity);
      });
      return grouped;
    }

    return {};
  }, [activities]);

  useEffect(() => {
    // avoid re-renders on every navigation
    if (activities.length === 0) {
      fetchActivitiesMutation.mutate();
    }
  }, [activities]);

  if (fetchActivitiesMutation.isPending || isLoadingActivities) {
    return <HomepageLoading />;
  }
  console.log(
    "Object.keys(groupedActivities): ",
    Object.keys(groupedActivities)
  );

  return (
    <section className="p-0 flex flex-col gap-0 pb-14">
      {Object.keys(groupedActivities).length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-neutral-600 my-2">No archived activities</p>
        </div>
      ) : (
        Object.keys(groupedActivities).map((date) => (
          <div
            key={`grouped-activities-archived-${date}`}
            className={cn(
              "",
              groupedActivities[date].length === 0 ? "hidden" : ""
            )}
          >
            <p className="text-neutral-600 text-center my-2">{date}</p>
            {groupedActivities[date]?.map((activity) => (
              <ActivityItem
                activity={activity}
                key={`activity-item-${activity.id}`}
              />
            ))}
          </div>
        ))
      )}
      <ArchivedPageFooter />
    </section>
  );
};

const ArchivedPageFooter = () => {
  const batchUnarchiveMutation = useUnarchiveAll();

  return (
    <div className="flex p-2 items-center justify-center absolute bottom-[70px] bg-white bg-opacity-30 w-full h-14">
      <Button
        onClick={batchUnarchiveMutation.mutate}
        loading={batchUnarchiveMutation.isPending}
      >
        Unarchive All
      </Button>
    </div>
  );
};

const HomepageLoading = () => {
  return (
    <div className="p-0 flex flex-col gap-0">
      <div className="flex flex-col gap-0.5 border-b p-4">
        <Skeleton className="w-[120px]" />
        <Skeleton className="w-[120px]" />
      </div>
      <div className="flex flex-col gap-0.5 border-b p-4">
        <Skeleton className="w-[120px]" />
        <Skeleton className="w-[120px]" />
      </div>
      <div className="flex flex-col gap-0.5 border-b p-4">
        <Skeleton className="w-[120px]" />
        <Skeleton className="w-[120px]" />
      </div>
      <div className="flex flex-col gap-0.5 border-b p-4">
        <Skeleton className="w-[120px]" />
        <Skeleton className="w-[120px]" />
      </div>
      <div className="flex flex-col gap-0.5 border-b p-4">
        <Skeleton className="w-[120px]" />
        <Skeleton className="w-[120px]" />
      </div>
      <div className="flex flex-col gap-0.5 border-b p-4">
        <Skeleton className="w-[120px]" />
        <Skeleton className="w-[120px]" />
      </div>
      <div className="flex flex-col gap-0.5 border-b p-4">
        <Skeleton className="w-[120px]" />
        <Skeleton className="w-[120px]" />
      </div>
    </div>
  );
};

const ActivityItem = ({ activity }: { activity: IActivity }) => {
  const renderIcon = () => {
    if (activity.call_type === "voicemail") {
      return <InboxArrowDownIcon className="h-6 w-6 stroke-blue-500" />;
    }

    if (activity.direction === "inbound") {
      return (
        <PhoneArrowUpRightIcon
          className={cn(
            "h-6 w-6 ",
            activity.call_type === "missed" ? "stroke-red-500" : ""
          )}
        />
      );
    } else {
      return (
        <PhoneArrowDownLeftIcon
          className={cn(
            "h-6 w-6 ",
            activity.call_type === "missed" ? "stroke-red-500" : ""
          )}
        />
      );
    }
  };

  const navigate = useNavigate();
  return (
    <div
      className="px-4 py-3 border-b border-neutral-200 last:border-b-0 flex gap-4 items-center hover:opacity-100 cursor-pointer hover:bg-neutral-50"
      onClick={() => navigate(`/call?id=${activity.id}`)}
    >
      {renderIcon()}
      <div className="flex items-center justify-between w-full">
        <div className="w-full">
          <p
            className={cn(
              "text-base text-black font-bold",
              activity.call_type === "missed" ? "text-red-500" : ""
            )}
          >
            From: {activity.from ? activity.from : "Unknown"}
          </p>
          <p className="text-base text-neutral-600">
            To: {activity.to ? activity.to : "Unknown"}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-sm text-black whitespace-nowrap">
            {activity.created_at
              ? format(activity.created_at, "hh:mm a")
              : "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};
