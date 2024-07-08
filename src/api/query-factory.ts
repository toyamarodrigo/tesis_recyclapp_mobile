import {
  createQueryKeys,
  createQueryKeyStore,
} from "@lukemorales/query-key-factory";
import { Pokemon } from "@models/pokemon.type";
import { pokemonApi } from "./api.pokemon";
import { userApi } from "./api.user";

export const pokemonKeys = createQueryKeyStore({
  pokemon: {
    detail: (id: number) => ({
      queryKey: [id],
      queryFn: () => pokemonApi.getPokemon(id),
    }),
    list: (filters: Pokemon[], limit: number, offset: number) => ({
      queryKey: [{ filters, limit, offset }],
      queryFn: () => pokemonApi.getPokemonList({ limit, offset }),
    }),
  },
});

export const userKeys = createQueryKeyStore({
  user: {
    list: () => ({
      queryKey: ["list"],
      queryFn: () => userApi.getUser(),
    }),
  },
});
