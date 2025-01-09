import Image from "next/image";
import type { Pokemon } from "@/lib/services/pokemon/pokemon.types";
import styles from "./page.module.css";
import { notFound } from "next/navigation";

type Params = Promise<{ name: string }>;
// type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const capitalizeFirstLetter = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1);

export async function generateMetadata({ params }: { params: Params }) {
  const { name } = await params;

  return {
    title: `Pokémon: ${capitalizeFirstLetter(name)}`,
    description: `Details about ${name}.`,
  };
}

const Description = ({
  base_experience,
  height,
  weight,
}: Partial<Pokemon> | Pokemon) => {
  const DescriptionSection = ({
    title,
    description,
  }: {
    title: string;
    description: string | number;
  }) => {
    return (
      <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
        <dt className="font-medium text-gray-900">{title}</dt>
        <dd className="text-gray-700 sm:col-span-2">{description}</dd>
      </div>
    );
  };

  return (
    <div className="flow-root">
      <dl className="-my-3 divide-y divide-gray-100 text-sm">
        <DescriptionSection
          title="Base Experience"
          description={base_experience ?? ""}
        />
        <DescriptionSection title="Weight" description={height ?? ""} />
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Weight</dt>
          <dd className="text-gray-700 sm:col-span-2">{weight}</dd>
        </div>
      </dl>
    </div>
  );
};

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const { sprites, name, types, abilities } = pokemon;

  return (
    <div className="relative overflow-hidden rounded-lg border border-gray-100 bg-white p-4 sm:p-6 lg:p-8 grid gap-4 grid-cols-1 items-center sm:grid-cols-2">
      <span
        className={`bg-${types[0].type.name} bg-gradient-to-bl absolute inset-x-0 bottom-0 h-2`}
      />
      <div>
        <div className="grid gap-2">
          <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
            {capitalizeFirstLetter(name)}
          </h3>
          <Image
            alt={`In game sprite of ${name}`}
            src={sprites.front_default}
            className="size-32 rounded-lg object-cover shadow-sm bg-slate-200"
            width={256}
            height={256}
          />
          <div className={`grid grid-cols-1`}>
            {abilities.map((ability) => (
              <p
                key={ability.slot}
                className="mt-1 text-xs font-medium text-gray-600"
              >
                {ability.is_hidden && (
                  <span className="font-bold">HIDDEN ABILITY</span>
                )}{" "}
                {ability.ability.name}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <ul className="w-fit grid grid-cols-2 gap-1 text-pretty">
            {types.map((typeInfo) => (
              <li key={typeInfo.type.name}>
                <div className={`bg-${typeInfo.type.name} ${styles.typeCard}`}>
                  {typeInfo.type.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Description {...pokemon} />
    </div>
  );
};

async function getData(name: string): Promise<Pokemon | null> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) {
    return null;
  }
  return await res.json();
}

export default async function PokemonPage({
  params,
}: // searchParams,
{
  params: Params;
  // searchParams: SearchParams;
}) {
  const name = (await params).name;
  const pokemon = await getData(name);
  if (!pokemon) {
    return notFound();
  }

  return (
    <div className="mx-auto w-full max-w-3xl p-3">
      <PokemonCard pokemon={pokemon} />
    </div>
  );
}
