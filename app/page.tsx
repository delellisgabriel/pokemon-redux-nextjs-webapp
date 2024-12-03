import Counter from "@/components/Counter";
import PokemonList from "@/components/PokemonList";
import ResetButton from "@/components/ResetButton";
import Result from "@/components/Result";

export default function Home() {
  return (
    <div className="w-screen flex flex-col gap-10 mt-10 items-center">
      <h1 className="text-center font-bold text-2xl text-gray-600">
        Redux Counter
      </h1>
      <PokemonList />
      <div className="flex flex-col gap-4 items-center">
        <h1>Component 1</h1>
        <Counter />
        <Result />
      </div>
      <ResetButton />
    </div>
  );
}
