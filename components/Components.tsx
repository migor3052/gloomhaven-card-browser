import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { SubCardList } from "./CardList";
import { Item } from "../common/types";
import {
  useSelectedItem,
  useUpdateSelectedItem,
} from "../hooks/useSelectedItem";

type SettingsProps = {
  cardList: Item[];
};

const Components = ({ cardList }: SettingsProps) => {
  const { selectedItem } = useSelectedItem();
  const { updateSelectedItem } = useUpdateSelectedItem();

  return (
    <>
      <div
        className="settings-overlay"
        onClick={() => updateSelectedItem({ item: null })}
        style={{
          display: selectedItem?.item?.id !== undefined ? "block" : "none",
        }}
      />
      <div
        className="sub-items"
        style={selectedItem?.item?.id === undefined ? { width: "0px" } : {}}
      >
        <div className="settings-inner">
          <div className="settings-header">
            <div style={{ width: "24px" }} />
            <FontAwesomeIcon
              className="spoilers-close-icon"
              icon={faClose}
              onClick={() => updateSelectedItem({ item: null })}
            />
            <SubCardList cardList={cardList} showId />
          </div>
        </div>
      </div>
    </>
  );
};

export default Components;
