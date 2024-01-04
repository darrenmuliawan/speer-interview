import { useMutation } from "@tanstack/react-query";
import { request } from "../../utils";
import { IActivity } from "../../interfaces";
import { useActivities } from "./useActivities";

export const useUnarchiveActivity = () => {
  const { activities, setActivities, setSelectedActivityDetails } =
    useActivities();

  const unarchiveActivity = async ({ activity }: { activity: IActivity }) => {
    try {
      // submit request
      const response: any = await request(
        `/activities/${activity.id}`,
        "PATCH",
        {
          is_archived: false,
        }
      );

      if (response.ok) {
        // on success unarchive, update activities
        const activityIndex = activities.findIndex((a) => a.id === activity.id);
        if (activityIndex !== -1) {
          activities[activityIndex].is_archived = false;
          setActivities([...activities]);
        }

        // update current activity
        const newActivity = { ...activity };
        newActivity.is_archived = false;
        setSelectedActivityDetails(newActivity);

        return true;
      }

      // popup alert
      return false;
    } catch (e) {
      console.log("error: ", e);
      return false;
    }
  };

  return useMutation({
    mutationKey: ["unarchive-activity"],
    mutationFn: unarchiveActivity,
  });
};
