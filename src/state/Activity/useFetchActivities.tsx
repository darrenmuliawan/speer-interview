import { useMutation } from "@tanstack/react-query";
import { useActivities } from "./useActivities";
import { request } from "../../utils";

export const useFetchActivities = () => {
  const { setActivities } = useActivities();

  const fetchActivities = async () => {
    // @ts-ignore
    const response: Response = await request("/activities");
    const data = await response.json();

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
