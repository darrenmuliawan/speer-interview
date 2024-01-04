import { useMutation } from "@tanstack/react-query";
import { request } from "../../utils";
import { IActivity } from "../../interfaces";
import { useActivities } from "./useActivities";

export const useArchiveActivity = () => {
  const { activities, setActivities, setSelectedActivityDetails } =
    useActivities();

  const archiveActivity = async ({ activity }: { activity: IActivity }) => {
    try {
      // submit request
      const response = await request(`/activities/${activity.id}`, "PATCH", {
        is_archived: true,
      });

      if (response) {
        // on success archive, update activities
        const activityIndex = activities.findIndex((a) => a.id === activity.id);
        if (activityIndex !== -1) {
          activities[activityIndex].is_archived = true;
          setActivities([...activities]);
        }

        // update current activity
        setSelectedActivityDetails({
          ...activity,
          is_archived: true,
        });

        return response;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return useMutation({
    mutationKey: ["archive-activity"],
    mutationFn: archiveActivity,
  });
};
