import { News } from "@models/news";
import axios from "axios";

export const newsApi = {
  getNews: async () => {
    const result = await axios.get<News>(
      `https://newsdata.io/api/1/news?apikey=pub_60379cd65df8c2f273a6f295e60f7366f75c2&q=reciclar%20OR%20reciclado&country=ar&category=business,other`
    );

    return result.data;
  },
};
