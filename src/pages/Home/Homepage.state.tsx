import { atom, useAtom } from "jotai";
import { IActivity } from "../../interfaces";

// activities
const _activitiesAtom = atom<IActivity[]>([]);

export const useHomepageState = () => {
  // activities
  const [activities, setActivities] = useAtom(_activitiesAtom);

  return {
    activities,
    setActivities,
  };
};
