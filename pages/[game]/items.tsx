import { useEffect, useState, ChangeEvent } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { itemSearchResults } from "../api/items";
import { useSpoilers } from "../../hooks/useSpoilers";
import {
  getBaseUrl,
  getCharacterColor,
  getDescription,
  getTitle,
  itemSpoilerFilter,
  verifyQueryParam,
} from "../../common/helpers";
import { Item, Option } from "../../common/types";

import CardList from "../../components/CardList";
import Layout from "../../components/Layout";
import Sort from "../../components/Sort";
import Components from "../../components/Components";

const sortOrderOptions: Option[] = [
  { id: "id", name: "Item Number" },
  { id: "cost", name: "Cost" },
  { id: "name", name: "Name" },
];

const slotFilters: Option[] = [
  { id: "head", name: "Head" },
  { id: "body", name: "Body" },
  { id: "1h", name: "1 Hand" },
  { id: "2h", name: "2 Hands" },
  { id: "legs", name: "Legs" },
  { id: "small", name: "Small Item" },
];

const resourceFilters: Option[] = [
  { id: "lumber", name: "Lumber" },
  { id: "metal", name: "Metal" },
  { id: "hide", name: "Hide" },
  { id: "axenut", name: "Axe Nut" },
  { id: "arrowvine", name: "Arrow Vine" },
  { id: "corpsecap", name: "Corpse Cap" },
  { id: "flamefruit", name: "Flame Fruit" },
  { id: "rockroot", name: "Rock Root" },
  { id: "snowthistle", name: "Snow Thistle" },
];

const activationsFilters: Option[] = [
  { id: "consumed", name: "Consumed" },
  { id: "spent", name: "Spent" },
];

const ItemFilters = () => {
  const router = useRouter();
  const query = router.query;

  const handleSlotChange = (newSlot: string | null) => {
    query.slot === newSlot ? delete query.slot : (query.slot = newSlot);
    router.push({
      pathname: "items",
      query: query,
    });
  };

  const handleResourcesChange = (newResources: string | null) => {
    query.resources === newResources
      ? delete query.resources
      : (query.resources = newResources);
    router.push({
      pathname: "items",
      query: query,
    });
  };

  const handleActivationsChange = (newActivations: string | null) => {
    query.activations === newActivations
      ? delete query.activations
      : (query.activations = newActivations);
    router.push({
      pathname: "items",
      query: query,
    });
  };

  return (
    <div className="button-group filters">
      {slotFilters.map((slot, idx) => (
        <div
          key={idx}
          className={`filter-icon ${
            query.slot === slot.id ? "filter-icon-selected" : ""
          }`}
          onClick={() => handleSlotChange(slot.id)}
        >
          <img alt="" src={getBaseUrl() + `icons/items/${slot.id}.png`} />
        </div>
      ))}
      <span style={{ marginLeft: "30px" }} />

      <div className="button-group">
        {resourceFilters.map((resource, idx) => (
          <div
            key={idx}
            className={`filter-icon ${
              query.resources === resource.id ? "filter-icon-selected" : ""
            }`}
            onClick={() => handleResourcesChange(resource.id)}
          >
            <img alt="" src={getBaseUrl() + `icons/items/${resource.id}.png`} />
          </div>
        ))}
      </div>
      <span style={{ marginLeft: "30px" }} />
      {activationsFilters.map((activation, idx) => (
        <div
          key={idx}
          className={`filter-icon ${
            query.activations === activation.id ? "filter-icon-selected" : ""
          }`}
          onClick={() => handleActivationsChange(activation.id)}
        >
          <img alt="" src={getBaseUrl() + `icons/items/${activation.id}.png`} />
        </div>
      ))}
    </div>
  );
};

type PageProps = {
  searchResults: Item[];
};

const Items = ({ searchResults }: PageProps) => {
  const [itemId, setItemId] = useState(null);
  const [name, setName] = useState(null);
  const { spoilers } = useSpoilers();

  const router = useRouter();
  const game = verifyQueryParam(router.query.game, "gh");

  const handleIdSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemId(parseInt(e.target.value, 10));
  };

  const handleNameSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary",
      getCharacterColor(null)
    );
  }, []);

  const cardList = searchResults
    ?.filter(itemSpoilerFilter(spoilers))
    .filter((i) => !itemId || i.id === itemId)
    .filter((i) => !name || i.name.toLowerCase().includes(name.toLowerCase()));

  return (
    <Layout
      description={getDescription(game, "Item Cards", searchResults)}
      title={getTitle(game, "Items")}
    >
      <div className="toolbar">
        <div className="toolbar-inner">
          <Sort sortOrderOptions={sortOrderOptions} />
          <div
            className="flex"
            style={{ fontWeight: 600, justifyContent: "center" }}
          >
            {"Item ID:"}
            <input
              className="id-filter"
              onChange={handleIdSearchChange}
              type="number"
            />
          </div>
          <div
            className="flex"
            style={{ fontWeight: 600, justifyContent: "left" }}
          >
            {"Name:"}
            <input
              className="name-filter"
              onChange={handleNameSearchChange}
              type="text"
            />
          </div>
          <ItemFilters />
        </div>
      </div>
      {!spoilers.loading && (
        <>
          <Components />
          <CardList cardList={cardList} showId />
        </>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchResults = await itemSearchResults(context.query);

  return {
    props: {
      searchResults,
    },
  };
};

export default Items;
