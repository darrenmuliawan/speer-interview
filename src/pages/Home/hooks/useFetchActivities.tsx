import { useMutation } from "@tanstack/react-query";
import { request } from "../../../utils";
import { useHomepageState } from "../Homepage.state";

export const useFetchActivities = () => {
  const { setActivities } = useHomepageState();

  const fetchActivities = async () => {
    const response = await request("/activities");
    const data = response;

    if (data) {
      setActivities(data);
      return data;
    }
  };

  return useMutation({
    mutationKey: ["fetch-places"],
    mutationFn: fetchActivities,
  });
};
