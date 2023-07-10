import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faArrowsRotate,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";

import { getBaseUrl } from "../common/helpers";
import { Card, Item } from "../common/types";
import {
  useUpdateSelectedItem,
  useSelectedItem,
} from "../hooks/useSelectedItem";
import React from "react";

const CARDS_PER_PAGE = 12;

const Empty = () => {
  return (
    <div className="empty">
      <FontAwesomeIcon icon={faBan} height="48px" />
      <div>No Results</div>
      <div>
        Check your spoiler settings or try changing your search & filters
      </div>
    </div>
  );
};

const Card = ({ card, horizontal, showId }) => {
  const { updateSelectedItem } = useUpdateSelectedItem();

  const handleResourcesClick = () => {
    updateSelectedItem({ item: card });
  };

  return (
    <div className={horizontal ? "card-horizontal" : "card"}>
      {showId && <div className="card-id">{card.id}</div>}
      <div
        className="card-inner"
        style={{ paddingTop: horizontal ? "66%" : "150%" }}
      >
        <div className="card-img-front">
          <span aria-hidden="true" className="invisible">
            {card.name}
          </span>
          <img
            alt={String(card.name)}
            className="card-img"
            key={card.image}
            src={getBaseUrl() + card.image}
          />
        </div>
      </div>
      {card?.resources?.item && (
        <button className={`${"resources-btn"}`} onClick={handleResourcesClick}>
          <FontAwesomeIcon
            className={`${"card-flip-svg"}`}
            icon={faScrewdriverWrench}
            height="48px"
          />
        </button>
      )}
    </div>
  );
};

const FlipCard = ({ card, horizontal, showId }) => {
  const [flipped, setFlipped] = useState(false);
  const { updateSelectedItem } = useUpdateSelectedItem();

  const handleBtnClick = () => {
    setFlipped(!flipped);
  };
  const handleResourcesClick = () => {
    updateSelectedItem({ item: null });
  };

  return (
    <div className={horizontal ? "card-horizontal" : "card"}>
      {showId && <div className="card-id">{card.id}</div>}
      <div
        className={`card-inner ${flipped ? "card-inner-flipped" : ""}`}
        style={{ paddingTop: horizontal ? "66%" : "150%" }}
      >
        <div className="card-img-front">
          <span aria-hidden="true" className="invisible">
            {card.name}
          </span>
          <img
            alt={String(card.name)}
            className="card-img"
            src={getBaseUrl() + card.image}
            key={card.image + "-front"}
          />
        </div>
        <div className="card-img-back">
          <span aria-hidden="true" className="invisible">
            {card.name}
          </span>
          <img
            alt={String(card.name)}
            className="card-img"
            src={getBaseUrl() + card.imageBack}
            key={card.image + "-back"}
          />
        </div>
      </div>
      <button
        className={`${flipped ? "card-flip-btn-back" : "card-flip-btn"}`}
        onClick={handleBtnClick}
      >
        <FontAwesomeIcon
          className={`${flipped ? "card-flip-svg-back" : "card-flip-svg"}`}
          icon={faArrowsRotate}
          height="48px"
        />
      </button>
      {card?.resources?.item && (
        <button className={`${"resources-btn"}`} onClick={handleResourcesClick}>
          <FontAwesomeIcon
            className={`${"card-flip-svg"}`}
            icon={faScrewdriverWrench}
            height="48px"
          />
        </button>
      )}
    </div>
  );
};

type SubCardListProps = {
  cardList: Item[];
  horizontal?: boolean;
  showId?: boolean;
};

export const SubCardList = ({
  cardList,
  horizontal,
  showId,
}: SubCardListProps) => {
  const { selectedItem } = useSelectedItem();

  if (!selectedItem?.item) {
    return null;
  }
  return (
    <CardList
      cardList={cardList.filter((card) =>
        selectedItem?.item?.resources?.item.includes(card.id)
      )}
      horizontal={horizontal}
      showId={showId}
      flex={false}
    />
  );
};

type CardListProps = {
  cardList: Card[];
  horizontal?: boolean;
  showId?: boolean;
  flex?: boolean;
};

const FlipCardMemo = React.memo(FlipCard);
const CardMemo = React.memo(Card);
const CardList = ({
  cardList,
  horizontal,
  showId,
  flex = true,
}: CardListProps) => {
  const [data, setData] = useState(cardList.slice(0, CARDS_PER_PAGE));
  const loadMore = (page: number) => {
    setData(cardList?.slice(0, (page + 1) * CARDS_PER_PAGE));
  };

  useEffect(() => {
    setData(cardList?.slice(0, CARDS_PER_PAGE));
  }, [cardList]);

  if (data?.length === 0) return <Empty />;

  return (
    <InfiniteScroll
      className={flex ? "card-list" : "side-card-list"}
      hasMore={data?.length < cardList.length}
      loader={<h4 key={0}>Loading...</h4>}
      loadMore={loadMore}
      pageStart={0}
    >
      {data?.map((card, idx) =>
        card.imageBack ? (
          <FlipCardMemo
            key={idx}
            card={card}
            horizontal={horizontal}
            showId={showId}
          />
        ) : (
          <CardMemo
            key={idx}
            card={card}
            horizontal={horizontal}
            showId={showId}
          />
        )
      )}
      {[...Array(4)].map((_, idx) => (
        <div key={idx} className={horizontal ? "card-horizontal" : "card"} />
      ))}
    </InfiniteScroll>
  );
};

export default CardList;
