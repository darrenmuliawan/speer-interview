import { useMutation } from "@tanstack/react-query";
import { useActivities } from "./useActivities";
import { request } from "../../utils";

export const useFetchActivities = () => {
  const { setActivities } = useActivities();

  const fetchActivities = async () => {
    const response = await request("/activities");
    const data = response;

    if (data) {
      setActivities(data);
      return data;
    }
  };

  return useMutation({
    mutationKey: ["fetch-activities"],
    mutationFn: fetchActivities,
  });
};
