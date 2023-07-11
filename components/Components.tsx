import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { SubCardList } from "./CardList";
import { Item } from "../common/types";
import {
  useSelectedItem,
  useUpdateSelectedItem,
} from "../hooks/useSelectedItem";
import { allItems } from "../pages/api/items";

const Components = () => {
  const { selectedItem } = useSelectedItem();
  const [cardList, setCardList] = useState<Item[]>([]);

  useEffect(() => {
    allItems().then((items) => {
      setCardList(items);
    });
  }, [allItems]);

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
            <SubCardList cardList={cardList} showId />
            <FontAwesomeIcon
              className="spoilers-close-icon"
              icon={faClose}
              onClick={() => updateSelectedItem({ item: null })}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Components;
