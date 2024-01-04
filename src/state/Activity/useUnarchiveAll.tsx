import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useActivities } from "./useActivities";
import { useArchiveActivity } from "./useArchiveActivity";
import { useUnarchiveActivity } from "./useUnarchiveActivity";

export const useUnarchiveAll = () => {
  const { activities } = useActivities();
  const unarchiveActivityMutation = useUnarchiveActivity();

  const unarchiveAll = async () => {
    try {
      // keep track of how many successful operations
      var count = 0;

      // get all archived activities
      const archivedActivities = activities.filter((activity) => {
        return activity.is_archived;
      });

      // iterate through and unarchive 1-by-1
      for (let i = 0; i < archivedActivities.length; i++) {
        const activity = archivedActivities[i];
        const success = await unarchiveActivityMutation.mutateAsync({
          activity: activity,
        });

        // if success, increment count
        if (success) {
          count += 1;
        }
      }

      // popup alert
      alert(`${count}/${archivedActivities.length} activities unarchived!`);
    } catch (e) {
      console.log(e);
    }
  };

  return useMutation({
    mutationKey: ["unarchive-all"],
    mutationFn: unarchiveAll,
  });
};
