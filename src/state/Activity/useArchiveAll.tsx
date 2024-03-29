import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IActivity } from "../../interfaces";
import { request } from "../../utils";
import { useActivities } from "./useActivities";
import { useArchiveActivity } from "./useArchiveActivity";
import { useToast } from "../../components";

export const useArchiveAll = () => {
  const { activities } = useActivities();
  const archiveActivityMutation = useArchiveActivity();
  const { toast } = useToast();

  const archiveAll = async () => {
    try {
      // keep track of how many successful operations
      var count = 0;

      // get all unarchived activities
      const unarchivedActivities = activities.filter((activity) => {
        return !activity.is_archived;
      });

      // iterate through and archive 1-by-1
      for (let i = 0; i < unarchivedActivities.length; i++) {
        const activity = unarchivedActivities[i];
        const success = await archiveActivityMutation.mutateAsync({
          activity: activity,
        });

        // if success, increment count
        if (success) {
          count += 1;
        }
      }

      // popup alert
      setTimeout(() => {
        toast({
          description: `${count}/${unarchivedActivities.length} activities archived!`,
        });
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  return useMutation({
    mutationKey: ["archive-all"],
    mutationFn: archiveAll,
  });
};
