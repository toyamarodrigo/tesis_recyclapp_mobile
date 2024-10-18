export interface MaterialSection {
  title: string;
  data: CardItem[];
}

export type CardItem = RecyclableCardItem | SpecialWasteCardItem;

export interface BaseCardItem {
  name: string;
  icon: IconName;
}

export interface RecyclableCardItem extends BaseCardItem {
  material: string[];
}

export interface SpecialWasteCardItem extends BaseCardItem {
  material?: never;
}

export type IconName =
  | "bottle-wine"
  | "bottle-soda"
  | "battery"
  | "file-multiple"
  | "package-variant-closed"
  | "newspaper"
  | "book-open-page-variant"
  | "food-takeout-box"
  | "bottle-tonic"
  | "bottle-soda-classic"
  | "cup"
  | "silverware-fork-knife"
  | "trash-can"
  | "bottle-soda"
  | "spray"
  | "key"
  | "glass-fragile"
  | "oil"
  | "television-classic"
  | "lightbulb-fluorescent-tube"
  | "printer"
  | "bottle-tonic-skull"
  | "tire"
  | "thermometer"
  | "car-battery"
  | "brush"
  | "pill"
  | "road-variant";
