import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PokemonListResponse, Pokemon } from "./pokemon.types";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonListPage: builder.query<PokemonListResponse, string>({
      query: (page) => `pokemon?${page}`,
    }),
  }),
});

export const { useGetPokemonByNameQuery, useGetPokemonListPageQuery } =
  pokemonApi;
