import { atom, useAtom } from "jotai";
import { IActivity } from "../../interfaces";

// activities
const _activitiesAtom = atom<IActivity[]>([]);

// activity details
const _selectedActivityDetails = atom<IActivity | undefined>(undefined);

export const useActivities = () => {
  // activities
  const [activities, setActivities] = useAtom(_activitiesAtom);

  // activity details
  const [selectedActivityDetails, setSelectedActivityDetails] = useAtom(
    _selectedActivityDetails
  );

  return {
    activities,
    setActivities,
    selectedActivityDetails,
    setSelectedActivityDetails,
  };
};
