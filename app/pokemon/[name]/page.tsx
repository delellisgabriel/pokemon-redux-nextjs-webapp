import Image from "next/image";
import type { Pokemon } from "@/lib/services/pokemon/pokemon.types";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}) {
  const { name } = await params;

  return {
    title: `Pokémon: ${name.charAt(0).toUpperCase() + name.slice(1)}`,
    description: `Details about ${name}.`,
  };
}

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const { sprites, name, height, weight, types } = pokemon;

  return (
    <div className="w-fit grid gap-3 grid-cols-1 bg-white rounded-md border-white border text-black p-3 mx-auto">
      <h1 className="text-center">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h1>
      <Image src={sprites.front_default} alt={name} width={200} height={200} />
      <p>Height: {height}</p>
      <p>Weight: {weight}</p>
      <ul className="grid grid-cols-4 gap-1">
        {types.map((typeInfo) => (
          <li key={typeInfo.type.name}>
            <div className={`${styles[typeInfo.type.name]} ${styles.typeCard}`}>
              {typeInfo.type.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default async function PokemonPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = await params;

  // Fetch Pokémon data from the API
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (!response.ok) {
    return (
      <div>
        <h1>Pokémon Not Found</h1>
        <p>Could not find a Pokémon with the name &quot;{name}&quot;.</p>
      </div>
    );
  }

  const pokemon: Pokemon = await response.json();

  return (
    <div className="mx-auto w-full max-w-7xl px-3">
      <PokemonCard pokemon={pokemon} />
    </div>
  );
}
