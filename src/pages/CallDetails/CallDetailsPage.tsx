import { useLocation, useParams } from "react-router-dom";
import { useFetchActivityDetails } from "../../state/Activity/useFetchActivityDetails";
import { useEffect } from "react";
import { useActivities } from "../../state/Activity/useActivities";
import { format } from "date-fns";
import {
  PhoneArrowDownLeftIcon,
  PhoneArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import { cn } from "../../utils";
import { Button } from "../../components";
import Skeleton from "react-loading-skeleton";
import { useArchiveActivity } from "../../state/Activity/useArchiveActivity";
import { useUnarchiveActivity } from "../../state/Activity/useUnarchiveActivity";

export const CallDetailsPage = () => {
  // get call ID
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const call_id = searchParams.get("id");

  // get call details
  const fetchActivityDetailsMutation = useFetchActivityDetails();
  const { selectedActivityDetails } = useActivities();

  useEffect(() => {
    if (call_id) {
      fetchActivityDetailsMutation.mutate({ call_id });
    }
  }, [call_id]);

  if (fetchActivityDetailsMutation.isPending) {
    return <CallDetailsLoading />;
  }

  if (!selectedActivityDetails) return null;

  return (
    <section className="p-4 flex flex-col gap-4 flex-1 h-full">
      <CallDetailsHeader />
      <CallDetailsContent />
      <ArchiveContainer />
    </section>
  );
};

const CallDetailsContent = () => {
  const { selectedActivityDetails } = useActivities();

  if (!selectedActivityDetails) return null;

  return (
    <div>
      <div className="flex justify-between items-center">
        <p>
          From:{" "}
          {selectedActivityDetails.from
            ? selectedActivityDetails.from
            : "Unknown"}
        </p>
        <p>
          Via:{" "}
          {selectedActivityDetails.via
            ? selectedActivityDetails.via
            : "Unknown"}
        </p>
      </div>
      <p>
        To:{" "}
        {selectedActivityDetails.to ? selectedActivityDetails.to : "Unknown"}
      </p>
      <p>Duration: {selectedActivityDetails?.duration}</p>
    </div>
  );
};

const CallDetailsHeader = () => {
  const { selectedActivityDetails } = useActivities();

  const getDirection = () => {
    if (selectedActivityDetails?.direction === "inbound") {
      return (
        <div className="flex items-center gap-1">
          <PhoneArrowDownLeftIcon className="w-4 h-4 " />
          <span>
            Incoming Call
            {selectedActivityDetails.call_type === "missed" ? "(Missed)" : ""}
          </span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1">
        <PhoneArrowUpRightIcon className="w-4 h-4 " />
        <span>
          Outgoing Call{" "}
          {selectedActivityDetails?.call_type === "missed" ? "(Missed)" : ""}
        </span>
      </div>
    );
  };

  if (!selectedActivityDetails) return null;

  return (
    <div className="text-sm">
      <div
        className={cn(
          "text-neutral-600",
          selectedActivityDetails.call_type === "missed" ? "text-red-500" : "",
          selectedActivityDetails.call_type === "voicemail"
            ? "text-blue-500"
            : "",
          selectedActivityDetails.call_type === "answered"
            ? "text-green-500"
            : ""
        )}
      >
        {getDirection()}
      </div>
      <p className="text-base">
        {selectedActivityDetails.created_at
          ? format(new Date(selectedActivityDetails.created_at), "hh:mm a - PP")
          : null}
      </p>
    </div>
  );
};

const ArchiveContainer = () => {
  const { selectedActivityDetails } = useActivities();
  const archiveActivityMutation = useArchiveActivity();
  const unarchiveActivityMutation = useUnarchiveActivity();

  if (!selectedActivityDetails) return null;

  const handleArchive = () => {
    if (!selectedActivityDetails.is_archived) {
      archiveActivityMutation.mutate({
        activity: selectedActivityDetails,
      });
    } else {
      unarchiveActivityMutation.mutate({
        activity: selectedActivityDetails,
      });
    }
  };

  return (
    <div className="flex-1 items-end justify-center flex">
      <Button
        onClick={handleArchive}
        loading={
          archiveActivityMutation.isPending ||
          unarchiveActivityMutation.isPending
        }
      >
        {selectedActivityDetails.is_archived ? "Unarchive" : "Archive"}
      </Button>
    </div>
  );
};

const CallDetailsLoading = () => {
  return (
    <div className="p-4 flex flex-col justify-between h-full">
      <div className="flex flex-col gap-4">
        <div>
          <Skeleton className="h-[20px] w-[80px]" />
          <Skeleton className="h-[20px] w-[120px]" />
        </div>
        <div>
          <div className="flex justify-between">
            <Skeleton className="h-[20px] w-[120px]" />
            <Skeleton className="h-[20px] w-[120px]" />
          </div>
          <Skeleton className="h-[20px] w-[120px]" />
          <Skeleton className="h-[20px] w-[120px]" />
        </div>
      </div>
      <Skeleton className="h-[40px] w-full" />
    </div>
  );
};
