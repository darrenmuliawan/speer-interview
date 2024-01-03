import { atom, useAtom } from "jotai";

// footer
const _selectedFooterTab = atom<"activity" | "archived">("activity");

export const useNavigationState = () => {
  // footer
  const [selectedFooterTab, setSelectedFooterTab] = useAtom(_selectedFooterTab);

  return {
    selectedFooterTab,
    setSelectedFooterTab,
  };
};
