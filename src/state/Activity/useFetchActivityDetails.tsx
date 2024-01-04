import { useMutation } from "@tanstack/react-query";
import { useActivities } from "./useActivities";
import { request } from "../../utils";

export const useFetchActivityDetails = () => {
  const { setSelectedActivityDetails } = useActivities();

  const fetchActivities = async ({ call_id }: { call_id: string }) => {
    const response = await request(`/activities/${call_id}`);
    const data = response;
    console.log("data: ", data);

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
