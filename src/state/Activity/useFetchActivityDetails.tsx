import { useMutation } from "@tanstack/react-query";
import { useActivities } from "./useActivities";
import { request } from "../../utils";

export const useFetchActivityDetails = () => {
  const { setSelectedActivityDetails, setIsLoadingActivityDetails } =
    useActivities();

  const fetchActivities = async ({ call_id }: { call_id: string }) => {
    try {
      // set loading state
      setIsLoadingActivityDetails(true);

      // @ts-ignore
      const response: Response = await request(`/activities/${call_id}`);
      const data = await response.json();

      if (data) {
        setSelectedActivityDetails(data);

        // reset loading state
        setIsLoadingActivityDetails(false);

        return data;
      }
    } catch (e) {
      console.log(e);

      // reset loading state
      setIsLoadingActivityDetails(false);
    }
  };

  return useMutation({
    mutationKey: ["fetch-activity-details"],
    mutationFn: fetchActivities,
  });
};
