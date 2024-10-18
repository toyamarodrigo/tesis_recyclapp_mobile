export interface MaterialSection {
  title: string;
  data: CardItem[];
}

export interface CardItem {
  name: string;
  icon: IconName;
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