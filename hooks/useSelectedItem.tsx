import { createContext, useContext, useEffect, useState } from "react";
import { SelectedItem } from "../common/types";

interface SelectedItemContextInterface {
  selectedItem: SelectedItem;
}

interface UpdateSelectedItemContextInterface {
  setSelectedItem: (sc: SelectedItem) => void;
}
export const defaultSelectedItemContextValue: SelectedItem = {
  item: null,
};

const SelectedItemContext = createContext<SelectedItemContextInterface>({
  selectedItem: defaultSelectedItemContextValue,
});

const UpdateSelectedItemContext =
  createContext<UpdateSelectedItemContextInterface>({
    setSelectedItem: () => {},
  });

export const SelectedItemProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(
    defaultSelectedItemContextValue
  );

  useEffect(() => {
    const storageSelectedItem = localStorage.getItem("selectedItem");
    if (!storageSelectedItem) {
      setSelectedItem((selectedItem) => ({
        ...selectedItem,
      }));
      return;
    }

    const parsedSelectedItem = JSON.parse(storageSelectedItem);
    if (!parsedSelectedItem) {
      localStorage.delete("selectedItem");
      setSelectedItem((selectedItem) => ({
        ...selectedItem,
      }));
      return;
    }
  }, []);

  return (
    <SelectedItemContext.Provider value={{ selectedItem }}>
      <UpdateSelectedItemContext.Provider value={{ setSelectedItem }}>
        {children}
      </UpdateSelectedItemContext.Provider>
    </SelectedItemContext.Provider>
  );
};

export const useSelectedItem = () => {
  const { selectedItem } = useContext(SelectedItemContext);

  return { selectedItem };
};

export const useUpdateSelectedItem = () => {
  const { setSelectedItem } = useContext(UpdateSelectedItemContext);
  const updateSelectedItem = (newSelectedItem: SelectedItem) => {
    localStorage.setItem(
      "selectedItem",
      JSON.stringify({
        ...newSelectedItem,
      })
    );
    setSelectedItem(newSelectedItem);
  };
  return { updateSelectedItem };
};
