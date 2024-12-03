"use client";
import { useGetPokemonListPageQuery } from "@/lib/services/pokemon";
import { useState } from "react";

const INITIAL_POKEMON_LIST_PAGE: string = "offset=0&limit=151";

const getUrlParams = (url: string) => url.split("?")[1];

const PokemonList = () => {
  const [page, setPage] = useState<string>(INITIAL_POKEMON_LIST_PAGE);
  const { data, error, isLoading } = useGetPokemonListPageQuery(page);

  if (isLoading) {
    return <div>Loading pokemon data!</div>;
  }

  if (error) {
    return <div>There was an error loading the pokemon 😿</div>;
  }

  return (
    <div className="w-full max-w-7xl p-2 mx-auto">
      <table>
        <caption>Pokemon table</caption>
        <thead>
          <tr>
            <th scope="col">name</th>
          </tr>
        </thead>
        {data && (
          <>
            <tbody>
              {data.results.map((pokemon) => (
                <tr key={pokemon.name}>
                  <th scope="row">
                    <a href="">{pokemon.name}</a>
                  </th>
                </tr>
              ))}
            </tbody>
            <div>
              <button
                disabled={!data?.previous}
                onClick={() => setPage(getUrlParams(data?.previous ?? ""))}
              >
                previous
              </button>
              <button
                disabled={!data?.next}
                onClick={() => setPage(getUrlParams(data?.next ?? ""))}
              >
                next
              </button>
            </div>
          </>
        )}
      </table>
    </div>
  );
};

export default PokemonList;
