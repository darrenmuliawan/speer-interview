import { useMutation } from "@tanstack/react-query";
import { useActivities } from "./useActivities";
import { request } from "../../utils";

export const useFetchActivityDetails = () => {
  const { setSelectedActivityDetails } = useActivities();

  const fetchActivities = async ({ call_id }: { call_id: string }) => {
    // @ts-ignore
    const response: Response = await request(`/activities/${call_id}`);
    const data = await response.json();

    if (data) {
      setSelectedActivityDetails(data);
      return data;
    }
  };

  return useMutation({
    mutationKey: ["fetch-activity-details"],
    mutationFn: fetchActivities,
  });
};
