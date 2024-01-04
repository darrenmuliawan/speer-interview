import { useMutation } from "@tanstack/react-query";
import { request } from "../../utils";
import { IActivity } from "../../interfaces";
import { useActivities } from "./useActivities";
import { useToast } from "../../components";

export const useArchiveActivity = () => {
  const { activities, setActivities, setSelectedActivityDetails } =
    useActivities();
  const { toast } = useToast();

  const archiveActivity = async ({ activity }: { activity: IActivity }) => {
    try {
      // submit request
      const response: any = await request(
        `/activities/${activity.id}`,
        "PATCH",
        {
          is_archived: true,
        }
      );

      if (response.ok) {
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

        // popup alert
        toast({
          title: "Success",
          description: `Activity #${activity.id} is archived.`,
        });

        return true;
      }

      // popup alert
      toast({
        title: "Error",
        description: `Failed to archive activity #${activity.id}. Please try again.`,
        variant: "destructive",
      });
      return false;
    } catch (e) {
      console.log("archive error:", e);

      // popup alert
      toast({
        title: "Error",
        description: `Failed to archive activity #${activity.id}. Please try again.`,
        variant: "destructive",
      });
      return false;
    }
  };

  return useMutation({
    mutationKey: ["archive-activity"],
    mutationFn: archiveActivity,
    retry: 3,
  });
};
