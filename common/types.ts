export interface Card {
  id?: number | string;
  name: number | string;
  image: string;
  imageBack?: string;
}

export type Game = {
  id: string;
  name: string;
  defaultClass: string;
  defaultMonster: string;
};

export type Character = {
  class: string;
  colour: string;
  name: string;
  altName?: string;
  game: string;
  matImage: string;
  source?: string;
  sheetImage: string;
  base?: boolean;
  hidden?: boolean;
};

export type CharacterAbility = {
  name: string;
  class: string;
  game: string;
  image: string;
  initiative: number;
  level: number;
  imageBack?: string;
  milestone?: boolean;
};
export type Resources = {
  lumber?: number;
  metal?: number;
  hide?: number;
  flamefruit?: number;
  rockroot?: number;
  snowthistle?: number;
  corpsecap?: number;
  axenut?: number;
  arrowvine?: number;
  item?: number[];
  anyHerb?: number[];
};

export type Item = {
  id: number;
  name: string;
  game: string;
  source: string;
  image: string;
  cost: number;
  slot: string;
  imageBack?: string;
  consumed?: boolean;
  spent?: boolean;
  prosperity?: number;
  resources?: Resources;
  count?: number;
  unlockCrafstmanLevel?: number;
  desc?: string;
  folder?: string;
};

export type Event = {
  id: number;
  name: number;
  game: string;
  eventType: string;
  image: string;
  imageBack?: string;
  season?: string;
};

export type Monster = {
  id: string;
  name: string;
  game: string;
  statCards: string[];
  abilityCards: string[];
  isVertical: boolean;
};

export type Option = {
  id: string;
  name: string;
};

export interface Spoilers {
  characters: Set<string>;
  items: Record<string, string | boolean>;
  level: number;
  loading: boolean;
  partyItems: boolean;
}

export interface SelectedItem {
  item?: Item;
}
