import type { NextApiRequest, NextApiResponse } from "next";

import { itemCards } from "../../data/item-cards";
import { customSort, verifyQueryParam } from "../../common/helpers";
import { Resources } from "../../common/types";

export const allItems = async () => {
  return itemCards["fh"] || [];
};

const resourceListIncludes = (
  resources: string[],
  item_resources: Resources
) => {
  if (!resources || !item_resources) return false;
  for (const resource of resources) {
    if (!(resource in item_resources)) {
      return false;
    }
  }
  return true;
};

export const itemSearchResults = async (query: {
  [key: string]: string | string[];
}) => {
  const game = verifyQueryParam(query.game, "gh");
  const order = verifyQueryParam(query.order, "id");
  const direction = verifyQueryParam(query.dir, "asc");
  const activations = verifyQueryParam(query.activations);
  const slot = verifyQueryParam(query.slot);
  const resource = verifyQueryParam(query.resources);
  const resourcesList = resource?.split("&");

  return (
    itemCards[game]
      ?.filter((item) => {
        if (
          resource &&
          item?.resources &&
          !resourceListIncludes(resourcesList, item?.resources)
        )
          return false;
        if (resource && !item?.resources) return false;
        if (slot && item.slot !== slot) return false;
        if (activations === "consumed" && !item.consumed) return false;
        if (activations === "spent" && !item.spent) return false;
        return true;
      })
      .sort(customSort(order, direction)) || []
  );
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const searchResults = await itemSearchResults(query);
  res.status(200).json({ searchResults: searchResults });
};

export default handler;
