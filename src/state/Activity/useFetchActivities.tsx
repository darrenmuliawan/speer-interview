import { useMutation } from "@tanstack/react-query";
import { useActivities } from "./useActivities";
import { request } from "../../utils";

export const useFetchActivities = () => {
  const { setActivities, setIsLoadingActivities } = useActivities();

  const fetchActivities = async () => {
    try {
      // set loading state
      setIsLoadingActivities(true);

      // @ts-ignore
      const response: Response = await request("/activities");
      const data = await response.json();

      if (data) {
        setActivities(data);

        // reset loading state
        setIsLoadingActivities(false);
        return data;
      }
    } catch (e) {
      console.log(e);
      // reset loading state
      setIsLoadingActivities(false);
    }
  };

  return useMutation({
    mutationKey: ["fetch-activities"],
    mutationFn: fetchActivities,
  });
};
