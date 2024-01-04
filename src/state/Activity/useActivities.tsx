import { atom, useAtom } from "jotai";
import { IActivity } from "../../interfaces";

// activities
const _activitiesAtom = atom<IActivity[]>([]);
const _isLoadingActivities = atom(false);

// activity details
const _selectedActivityDetails = atom<IActivity | undefined>(undefined);
const _isLoadingActivityDetails = atom(false);

export const useActivities = () => {
  // activities
  const [activities, setActivities] = useAtom(_activitiesAtom);
  const [isLoadingActivities, setIsLoadingActivities] =
    useAtom(_isLoadingActivities);

  // activity details
  const [selectedActivityDetails, setSelectedActivityDetails] = useAtom(
    _selectedActivityDetails
  );
  const [isLoadingActivityDetails, setIsLoadingActivityDetails] = useAtom(
    _isLoadingActivityDetails
  );

  return {
    activities,
    setActivities,
    selectedActivityDetails,
    setSelectedActivityDetails,
    isLoadingActivities,
    setIsLoadingActivities,
    isLoadingActivityDetails,
    setIsLoadingActivityDetails,
  };
};
