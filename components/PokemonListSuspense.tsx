import { Pokemon } from "@/lib/services/pokemon/pokemon.types";
import Link from "next/link";
import { Suspense, use } from "react";

const fetchPokemon = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const pokemonPromise = fetchPokemon();

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

const Pokemons = () => {
  const pokemons = use(pokemonPromise);

  return (
    <Suspense fallback={<Loading />}>
      <table>
        <tbody>
          {pokemons.results.map((pokemon: Pokemon) => (
            <tr key={pokemon.name}>
              <th scope="row">
                <Link href={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link> ✅
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </Suspense>
  );
};

export default Pokemons;
