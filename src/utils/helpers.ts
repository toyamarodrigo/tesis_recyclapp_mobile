export const getFileExtension = (uri: string): string => {
  const extension = uri.split(".").pop();
  return extension === "jpg" || extension === "jpeg" ? ".jpg" : `.${extension}`;
};
export const transformDate = (date: string) => {
  const splitDate = date.split("T")[0].split("-");
  const newDate = splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0];

  return newDate;
};

export function generateRandomWord() {
  const words = [
    "amor",
    "cielo",
    "luz",
    "vida",
    "paz",
    "sonrisa",
    "felicidad",
    "aventura",
    "esperanza",
    "alegría",
    "libertad",
    "amigo",
    "familia",
    "sabiduría",
    "corazón",
    "fuerza",
    "creatividad",
    "música",
    "arte",
    "pasión",
    "sueño",
    "naturaleza",
    "energía",
    "destino",
    "alma",
  ];

  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex].toUpperCase();
}
