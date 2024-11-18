export interface MaterialSection {
  title: string;
  data: CardItem[];
}

export type CardItem = RecyclableCardItem | SpecialWasteCardItem;

export interface BaseCardItem {
  name: string;
  icon: string;
}

export interface RecyclableCardItem extends BaseCardItem {
  material: string[];
}

export interface SpecialWasteCardItem extends BaseCardItem {
  material?: never;
}
