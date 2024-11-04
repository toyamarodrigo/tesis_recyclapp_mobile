export const ROUTES = {
  ROOT: "/",
  LOGIN: "/login",
  HOME: "/home",
  DETAILS: "/details",
  COUNTER: "/counter",
} as const;

//enum
export const BENEFITTYPE = {
  DISCOUNT: "DISCOUNT",
  PRODUCT: "PRODUCT",
  DOUBLEPRODUCT: "DOUBLEPRODUCT",
} as const;

//enum
export const BENEFITTYPEICON = {
  DISCOUNT: "percent",
  PRODUCT: "gift-open",
  DOUBLEPRODUCT: "plus-circle-multiple",
} as const;

export const BENEFITTYPETEXT = {
  DISCOUNT: "Descuento",
  PRODUCT: "Regalo",
  DOUBLEPRODUCT: "2 x 1",
} as const;

//enum
export const USERTYPE = {
  CUSTOMER: "CUSTOMER",
  STORE: "STORE",
} as const;

//enum
export const RECYCLABLETYPE = {
  RECYCLABLE: "RECYCLABLE",
  NO_RECYCLABLE: "NO_RECYCLABLE",
  DEPENDS: "DEPENDS",
  ORGANIC: "ORGANIC",
} as const;

//enum
export const POSTPURPOUSE = {
  HAVE: "HAVE",
  WANT: "WANT",
} as const;

export const USER_TYPE = {
  CUSTOMER: "CUSTOMER",
  STORE: "STORE",
} as const;
